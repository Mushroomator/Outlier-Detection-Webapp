import React, { useEffect, useState } from 'react';
import { Grid, GridItem } from "@chakra-ui/react"
import './App.css';
import { Header } from './components/Header';
import { ImageViewer } from './components/ImageViewer';
import { Sidebar } from './components/Sidebar';
import { IOutlierData, THistory } from './types';
import { socket } from './websocket';
import { config } from './config';

function App() {

  const [curOutlier, setCurOutlier] = useState<IOutlierData | undefined>(undefined);
  const [history, setHistory] = useState<THistory>([]);
  const [isLive, setIsLive] = useState<boolean>(config.isLiveDefault);

  if (isLive && history.length > 0 && history[0] !== curOutlier) {
    // show latest data if available
    setCurOutlier(history[0]);
  }

  useEffect(() => {
    // unregister previous handler, otherwise a handler will be registered every
    // time the hook runs (= when history changes) 
    // => one handler per inserted item per handler
    // => exponential growth of handlers and re-renders
    // => application will crash in very short time
    socket.off("/outlier-detection/result");
    socket.on("/outlier-detection/result", data => {
      const parsed = JSON.parse(data);
      parsed.time = new Date(parsed.time);
      // check wether history has reached its limit
      // Copy array as react only checks if references have changed 
      const histCopy = history.slice()
      if (histCopy.length >= config.maxNoImages) {
        // remove last element
        histCopy.pop()
      }
      // insert first element
      histCopy.unshift(parsed);
      // trigger re-render
      setHistory(histCopy);
    })
  }, [history])
  
  const headerHeight = "75px";
  return (
    <Grid
      p="0"
      m="0"
      w="100vw"
      h={"100vh"}
      boxSizing='border-box'
      maxH={"100vh"}
      maxW={"100vw"}
      bg={"gray.50"}
      templateAreas={[
        `
         "header"
         "sidebar"
         "content"
         `,
        `
         "header header"
         "sidebar content"
         `
      ]}
      gridTemplateRows={[
        `${headerHeight} 30vh auto`,
        `${headerHeight} calc(100vh - 75px)`
      ]}
      gridTemplateColumns={[
        "1fr",
        "350px 1fr"
      ]}>
      <Header />
      <GridItem
        w={"100%"}
        h={"100%"}
        maxH={"100%"}
        display={"grid"}
        gridArea={"content"}
        gridTemplateAreas={[
        `
          "original-image"
          "reconstructed-image"
        `
        ,
        `
          "original-image reconstructed-image"
        `
        ]}
        gridTemplateRows={["50vh, 50vh", `calc(100vh - ${headerHeight})`]}
        gridTemplateColumns={["1fr", "1fr 1fr"]}
      >
        <ImageViewer heading="Original image" image={curOutlier?.images?.reconstructed} gridArea="original-image" />
        <ImageViewer heading="Reconstructed image" image={curOutlier?.images?.reconstructed} gridArea="reconstructed-image" />
      </GridItem>
      <Sidebar details={curOutlier} history={history} isLive={isLive} setIsLive={setIsLive} setCurOutlier={setCurOutlier} />
    </Grid>
  );
}

export default App;
