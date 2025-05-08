function lineTitle(viewer, data, currOverlay,mapPosition) {

    if (currOverlay) {
        currOverlay.destroy();
    }
    let headdiv = `<div class="spr-box ">
                    <div onclick="closeBubbleTitle()" class="spr-img"></div>
                    <div class="title-box">${data.name}</div>
                    <div class="content-box">`;
    let taildiv = `</div>
                        <div class="line-box">
                            <div class="line-cont-box"></div>
                            <div class="line-cont-oblique">
                                <div class="ring-box">
                                    <div class="circular-box"></div>
                                </div>
                            </div>
                        </div>
                  </div>`;
     let zd = {
      Type:'道路线类型',
      length:'道路线长度（米）'
     }
     let middlediv = '<div class="panel-content">'
      for (let i in data){
        if (data[i] && zd[i]){
          middlediv += `
                    <div class="item">
                        <div class="name-num">${zd[i]} : </div>
                        <div class="content-num">${data[i]}</div>
                    </div> `
        }
      }
     
    
     middlediv = middlediv + '</div>'
    let div = headdiv + middlediv + taildiv;
    let element = $(div)[0];
    let option = {
        element: element,
        position: mapPosition,
        offset: {
            x: -181,
            y: -263
        }
    };

    currOverlay = new Custom.Overlay(option);
    viewer.addOverlay(currOverlay);
    window.closeBubbleTitle = () => {
        currOverlay.destroy()
    };
    return currOverlay
}

function removeLine(currOverlay){
  if (currOverlay) {
    currOverlay.destroy();
}
}

// export {
//   lineTitle,removeLine
// }
