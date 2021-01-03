const address = "http://localhost";
const csv_port = "8080";

darkmode = true;
function updateGraphZoom(graphname, newMinMax) {
  gdata = graphData[graphname];

  svgElement = gdata.svgElement;

  if (newMinMax.xmin != 0) {
    gdata.xmin = newMinMax.xmin || gdata.xmin;
  } else {
    gdata.xmin = 0;
  }

  if (newMinMax.xmax != 0) {
    gdata.xmax = newMinMax.xmax || gdata.xmax;
  } else {
    gdata.xmax = 0;
  }

  if (newMinMax.ymin != 0) {
    gdata.ymin = newMinMax.ymin || gdata.ymin;
  } else {
    gdata.ymin = 0;
  }

  if (newMinMax.ymax != 0) {
    gdata.ymax = newMinMax.ymax || gdata.ymax;
  } else {
    gdata.ymax = 0;
  }

  aratio = gdata.aspectratio;

  if (gdata.unitAspectRatio == "yes") {
    if (gdata.fixAxis == "yaxis") {
      if (gdata.fixAxisStretchCentrally == "yes") {
        centre = (gdata.xmax + gdata.xmin) / 2;
        gdata.xmin = centre - ((gdata.ymax - gdata.ymin) * aratio) / 2;
        gdata.xmax = centre + ((gdata.ymax - gdata.ymin) * aratio) / 2;
      } else {
        gdata.xmax = gdata.xmin + (gdata.ymax - gdata.ymin) * aratio;
      }
    } else {
      if (gdata.fixAxisStretchCentrally == "yes") {
        centre = (gdata.ymax + gdata.ymin) / 2;
        gdata.ymin = centre - ((gdata.xmax - gdata.xmin) * aratio) / 2;
        gdata.ymax = centre + ((gdata.xmax - gdata.xmin) * aratio) / 2;
      } else {
        gdata.ymax = gdata.ymin + (gdata.xmax - gdata.xmin) * aratio;
      }
    }
  }

  if (gdata.yaxisvisibility == "yes") {
    var lineElement = gdata.yaxisElement;
    lineElement.setAttribute(
      "x1",
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y1",
      graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute(
      "x2",
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y2",
      graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    if (darkmode == false) {
      lineElement.style.stroke = gdata.yaxiscolor;
    } else {
      lineElement.style.stroke = "hsla(0, 0%, 100%, 1)";
    }
    gdata.yaxisElement = lineElement;
  }

  if (gdata.xaxisvisibility == "yes") {
    var lineElement = gdata.xaxisElement;
    lineElement.setAttribute(
      "x1",
      graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y1",
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute(
      "x2",
      graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y2",
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    if (darkmode == false) {
      lineElement.style.stroke = gdata.xaxiscolor;
    } else {
      lineElement.style.stroke = "hsla(0, 0%, 100%, 1)";
    }
    gdata.xaxisElement = lineElement;
  }

  deleteSegments(gdata.xmajorgridElements);

  ticks = gdata.gridlinenumberX;

  if (gdata.xmajorgridlinesvisibility == "yes") {
    xmajortickvalues = gridtickvalues(gdata.xmin, gdata.xmax, ticks);
    gdata.xmajorgridElements = [];
    for (m = 0; m < xmajortickvalues.length; m++) {
      ticklocation = xmajortickvalues[m];
      var lineElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      ylength = gdata.ymax - gdata.ymin;
      if (gdata.xmajorgridlinesextension == "yes") {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(
            gdata.ymin - ylength / 2,
            gdata.ymin,
            gdata.ymax,
            aratio
          ) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(
            gdata.ymax + ylength / 2,
            gdata.ymin,
            gdata.ymax,
            aratio
          ) + "%"
        );
      } else {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("id", gdata.name + "-xmajorgridline-" + m);
      }
      if (darkmode == false) {
        lineElement.style.stroke = gdata.xmajorgridcolor;
      } else {
        lineElement.style.stroke = "hsla(0, 0%, 100%, 1)";
      }
      lineElement.setAttribute("id", gdata.name + "-xmajorgridline-" + m);
      lineElement.style.strokeWidth = gdata.xmajorgridthickness + "%";
      gdata.xmajorgridElements.push(lineElement);
      svgElement.appendChild(lineElement);
    }
    gdata.xmajorgridticks = xmajortickvalues;
  }

  deleteSegments(gdata.ymajorgridElements);

  ticks = gdata.gridlinenumberY;

  if (gdata.ymajorgridlinesvisibility == "yes") {
    ymajortickvalues = gridtickvalues(gdata.ymin, gdata.ymax, ticks);
    gdata.ymajorgridElements = [];
    for (m = 0; m < ymajortickvalues.length; m++) {
      ticklocation = ymajortickvalues[m];
      var lineElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      xlength = gdata.xmax - gdata.xmin;
      if (gdata.ymajorgridlinesextension == "yes") {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(
            gdata.xmin - xlength / 2,
            gdata.xmin,
            gdata.xmax,
            aratio
          ) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(
            gdata.xmax + xlength / 2,
            gdata.xmin,
            gdata.xmax,
            aratio
          ) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
      } else {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
      }
      lineElement.setAttribute("id", gdata.name + "-ymajorgridline-" + m);
      if (darkmode == false) {
        lineElement.style.stroke = gdata.ymajorgridcolor;
      } else {
        lineElement.style.stroke = "hsla(0, 0%, 100%, 1)";
      }
      lineElement.setAttribute("id", gdata.name + "-ymajorgridline-" + m);
      lineElement.style.strokeWidth = gdata.ymajorgridthickness + "%";
      gdata.ymajorgridElements.push(lineElement);
      svgElement.appendChild(lineElement);
    }
    gdata.ymajorgridticks = ymajortickvalues;
  }

  deleteSegments(gdata.ymajorlabelsElements);

  ticks = gdata.gridlinenumberY;

  if (gdata.ymajorgridlabelvisibility == "yes") {
    gdata.ymajorlabelsElements = [];
    ymajortickvalues = gridtickvalues(gdata.ymin, gdata.ymax, ticks);
    scale = gdata.ymax - gdata.ymin;
    expstring = scale.toExponential().toString();
    order = expstring.slice(expstring.indexOf("e") + 1) * -1;
    labelylocationX = gdata.axislocationX;
    if (
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) < 0
    ) {
      labelylocationX = gdata.xmin;
    }
    if (
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) > 100
    ) {
      labelylocationX = gdata.xmax;
    }
    for (
      m = gdata.ylabelexclusionsstart;
      m < ymajortickvalues.length - gdata.ylabelexclusionsend;
      m++
    ) {
      ticklocation = ymajortickvalues[m];
      value = ticklocation;
      if (eval(gdata.ymajorgridlabelOnlyIf)) {
        var textElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        if (isInt(ticklocation)) {
          if (gdata.isComplexPlane == "yes") {
            textElement.innerHTML = ticklocation + "i";
          } else {
            textElement.innerHTML = ticklocation;
          }
        } else {
          if (Math.abs(ticklocation) < 0.01 && order > 2) {
            ticklocation = ticklocation.toExponential(order);
          } else {
            ticklocation = ticklocation.toFixed(order + 1);
          }
          if (gdata.isComplexPlane == "yes") {
            textElement.innerHTML = ticklocation + "i";
          } else {
            textElement.innerHTML = ticklocation;
          }
          if (ticklocation == 0) {
            textElement.innerHTML = 0;
          }
        }

        textElement.setAttribute(
          "x",
          graphToScaledX(labelylocationX, gdata.xmin, gdata.xmax, aratio) +
            0.5 +
            gdata.ymajorgridlabelshift +
            "%"
        );
        textElement.setAttribute(
          "y",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) +
            0.5 +
            "%"
        );
        textElement.setAttribute("id", gdata.name + "-yticklabel-" + m);
        textElement.style.fontSize = gdata.fontSize;
        textElement.style.fontFamily = "Source Sans Pro";
        textElement.style.userSelect = "none";
        // textElement.setAttribute('text-anchor', 'middle')
        textElement.style.fill = gdata.ymajorgridlabelcolor;
        if (darkmode == false) {
          textElement.style.fill = gdata.ymajorgridlabelcolor;
        } else {
          textElement.style.fill = "hsla(0, 0%, 100%, 1)";
        }
        svgElement.appendChild(textElement);

        gdata.ymajorlabelsElements.push(textElement);
      }
    }
  }

  deleteSegments(gdata.xmajorlabelsElements);

  ticks = gdata.gridlinenumberX;

  if (gdata.xmajorgridlabelvisibility == "yes") {
    gdata.xmajorlabelsElements = [];
    xmajortickvalues = gridtickvalues(gdata.xmin, gdata.xmax, ticks);
    scale = gdata.xmax - gdata.xmin;
    expstring = scale.toExponential().toString();
    order = expstring.slice(expstring.indexOf("e") + 1) * -1;

    labelxlocationY = gdata.axislocationY;
    if (
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) < 0
    ) {
      labelxlocationY = gdata.ymax;
    }
    if (
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) > 100
    ) {
      labelxlocationY = gdata.ymin;
    }

    for (
      m = gdata.xlabelexclusionsstart;
      m < xmajortickvalues.length - gdata.xlabelexclusionsend;
      m++
    ) {
      ticklocation = xmajortickvalues[m];

      value = ticklocation;
      if (eval(gdata.xmajorgridlabelOnlyIf)) {
        var textElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        if (isInt(ticklocation)) {
          textElement.innerHTML = ticklocation;
        } else {
          if (Math.abs(ticklocation) < 0.01 && order > 2) {
            ticklocation = ticklocation.toExponential(order);
          } else {
            ticklocation = ticklocation.toFixed(order + 1);
          }
          textElement.innerHTML = ticklocation;

          if (ticklocation == 0) {
            textElement.innerHTML = 0;
          }
        }

        transformedXval =
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) - 1;
        textElement.setAttribute("x", transformedXval + "%");
        transformedYval =
          graphToScaledY(labelxlocationY, gdata.ymin, gdata.ymax, aratio) +
          2 +
          gdata.xmajorgridlabelshift;
        textElement.setAttribute("y", transformedYval + "%");
        textElement.setAttribute("id", gdata.name + "-xticklabel-" + m);
        textElement.style.fontSize = gdata.fontSize;
        textElement.style.userSelect = "none";
        textElement.setAttribute("text-anchor", "middle");
        if (parseFloat(order) >= 2) {
          textElement.setAttribute(
            "transform",
            "rotate(90, " + transformedXval + ", " + transformedYval + ")"
          );
        }
        textElement.style.fontFamily = "Source Sans Pro";
        if (darkmode == false) {
          textElement.style.fill = gdata.xmajorgridlabelcolor;
        } else {
          textElement.style.fill = "hsla(0, 0%, 100%, 1)";
        }
        svgElement.appendChild(textElement);

        gdata.xmajorlabelsElements.push(textElement);
      }
    }
  }

  if (gdata.xaxislabelvisibility == "yes") {
    var textElement = gdata.xaxislabelElement;
    textElement.setAttribute(
      "x",
      graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) +
        gdata.xaxislabelshift +
        "%"
    );
    textElement.setAttribute(
      "y",
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) +
        1 +
        "%"
    );
    gdata.xaxislabelElement = textElement;
  }

  if (gdata.yaxislabelvisibility == "yes") {
    var textElement = gdata.yaxislabelElement;
    textElement.setAttribute(
      "x",
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) +
        0 +
        "%"
    );
    textElement.setAttribute(
      "y",
      graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) -
        gdata.yaxislabelshift +
        "%"
    );
    gdata.yaxislabelElement = textElement;
  }

  for (var key in gdata.lineData) {
    lineElement = gdata.lineData[key][0];
    lineoptions = gdata.lineData[key][1];

    lineElement.setAttribute(
      "x1",
      graphToScaledX(lineoptions.x1, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y1",
      graphToScaledY(lineoptions.y1, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute(
      "x2",
      graphToScaledX(lineoptions.x2, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y2",
      graphToScaledY(lineoptions.y2, gdata.ymin, gdata.ymax, aratio) + "%"
    );
  }

  for (var key in gdata.circleData) {
    circleElement = gdata.circleData[key][0];
    circleoptions = gdata.circleData[key][1];
    rx = distanceBTWgraphToSvg(
      [0, 0],
      [circleoptions.radius, 0],
      gdata.xmin,
      gdata.xmax,
      gdata.ymin,
      gdata.ymax,
      aratio
    );
    ry = distanceBTWgraphToSvg(
      [0, 0],
      [0, circleoptions.radius],
      gdata.xmin,
      gdata.xmax,
      gdata.ymin,
      gdata.ymax,
      aratio
    );
    circleElement.setAttribute(
      "cx",
      graphToScaledX(circleoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    circleElement.setAttribute(
      "cy",
      graphToScaledY(circleoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    circleElement.setAttribute("rx", rx + "%");
    circleElement.setAttribute("ry", ry + "%");
  }

  for (var key in gdata.pathData) {
    pathElement = gdata.pathData[key][0];
    pathoptions = gdata.pathData[key][1];
    pathstring = "M";
    for (pth = 0; pth < pathoptions.points.length; pth++) {
      if (pth == 0) {
        pathstring =
          pathstring +
          graphToScaledX(
            pathoptions.points[pth][0],
            gdata.xmin,
            gdata.xmax,
            aratio
          ) +
          " " +
          graphToScaledY(
            pathoptions.points[pth][1],
            gdata.ymin,
            gdata.ymax,
            aratio
          ) +
          " ";
      } else {
        pathstring =
          pathstring +
          "L" +
          graphToScaledX(
            pathoptions.points[pth][0],
            gdata.xmin,
            gdata.xmax,
            aratio
          ) +
          " " +
          graphToScaledY(
            pathoptions.points[pth][1],
            gdata.ymin,
            gdata.ymax,
            aratio
          ) +
          " ";
      }
    }
    pathElement.setAttribute("d", pathstring);
  }

  for (var key in gdata.ellipseData) {
    ellipseElement = gdata.ellipseData[key][0];
    ellipseoptions = gdata.ellipseData[key][1];
    rx = distanceBTWgraphToSvg(
      [0, 0],
      [ellipseoptions.rx, 0],
      gdata.xmin,
      gdata.xmax,
      gdata.ymin,
      gdata.ymax,
      aratio
    );
    ry = distanceBTWgraphToSvg(
      [0, 0],
      [0, ellipseoptions.ry],
      gdata.xmin,
      gdata.xmax,
      gdata.ymin,
      gdata.ymax,
      aratio
    );
    ellipseElement.setAttribute(
      "cx",
      graphToScaledX(ellipseoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    ellipseElement.setAttribute(
      "cy",
      graphToScaledY(ellipseoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    ellipseElement.setAttribute("rx", rx + "%");
    ellipseElement.setAttribute("ry", ry + "%");
  }

  for (var key in gdata.textData) {
    textElement = gdata.textData[key][0];
    textoptions = gdata.textData[key][1];
    textElement.setAttribute(
      "x",
      graphToScaledX(textoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    textElement.setAttribute(
      "y",
      graphToScaledY(textoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
    );
  }

  for (var key in gdata.rectData) {
    rectElement = gdata.rectData[key][0];
    rectoptions = gdata.rectData[key][1];

    rx = distanceBTWgraphToSvg(
      [0, 0],
      [rectoptions.w, 0],
      gdata.xmin,
      gdata.xmax,
      gdata.ymin,
      gdata.ymax,
      aratio
    );
    ry = distanceBTWgraphToSvg(
      [0, 0],
      [0, rectoptions.h],
      gdata.xmin,
      gdata.xmax,
      gdata.ymin,
      gdata.ymax,
      aratio
    );

    rectElement.setAttribute(
      "x",
      graphToScaledX(rectoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    rectElement.setAttribute(
      "y",
      graphToScaledY(rectoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    rectElement.setAttribute("width", rx + "%");
    rectElement.setAttribute("height", ry + "%");
  }

  for (var key in gdata.pointData) {
    pointElement = gdata.pointData[key][0];
    pointoptions = gdata.pointData[key][1];

    pointElement.setAttribute(
      "cx",
      graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    pointElement.setAttribute(
      "cy",
      graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
    );
  }
}

//////////////////////////////// Styling
document.body.style.background = "black";

function graphToScaledY(value, graphymin, graphymax, aspectratio) {
  if (aspectratio > 1) {
    if (graphymin == graphymax) {
      graphymin = graphymin - 1;
      graphymax = graphymax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    if (graphymin > graphymax) {
      temp = graphymin;
      graphymin = graphymax;
      graphymax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    y = (-80 / (graphymax - graphymin)) * (value - graphymin) + 90;
  } else {
    if (graphymin == graphymax) {
      graphymin = graphymin - 1;
      graphymax = graphymax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    if (graphymin > graphymax) {
      temp = graphymin;
      graphymin = graphymax;
      graphymax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    aspectratio = 1 / aspectratio;
    vl = (100 * (1 - aspectratio)) / 2 + 10 * aspectratio;
    vh = (100 * (aspectratio + 1)) / 2 - 10 * aspectratio;
    y = ((vl - vh) / (graphymax - graphymin)) * (value - graphymin) + vh;
    // console.log(x)
    // console.log(v1, v2)
    // y = (((v2 - v1)/(100))*(y)) + v1
  }

  return y;
}

function svgToGraphY(percentvalue, graphymin, graphymax, aspectratio) {
  if (aspectratio > 1) {
    if (graphymin == graphymax) {
      graphymin = graphymin - 1;
      graphymax = graphymax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    if (graphymin > graphymax) {
      temp = graphymin;
      graphymin = graphymax;
      graphymax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }

    y = ((percentvalue - 90) * (graphymax - graphymin)) / (-1 * 80) + graphymin;
  } else {
    if (graphymin == graphymax) {
      graphymin = graphymin - 1;
      graphymax = graphymax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    if (graphymin > graphymax) {
      temp = graphymin;
      graphymin = graphymax;
      graphymax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphymax +
          " and Min value : " +
          graphymin
      );
    }
    aspectratio = 1 / aspectratio;
    vl = (100 * (1 - aspectratio)) / 2 + 10 * aspectratio;
    vh = (100 * (aspectratio + 1)) / 2 - 10 * aspectratio;

    // y = ((vl - vh)/(graphymax - graphymin))*(value - graphymin) + vh
    y = ((percentvalue - vh) * (graphymax - graphymin)) / (vl - vh) + graphymin;
    // console.log(x)
    // console.log(v1, v2)
    // y = (((v2 - v1)/(100))*(y)) + v1
  }

  return y;
}

function graphToSvgX(value, graphxmin, graphxmax) {
  if (graphxmin == graphxmax) {
    graphxmin = graphxmin - 1;
    graphxmax = graphxmax + 1;
    console.log(
      "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
        graphxmax +
        " and Min value : " +
        graphxmin
    );
  }
  if (graphxmin > graphxmax) {
    temp = graphxmin;
    graphxmin = graphxmax;
    graphxmax = temp;
    console.log(
      "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
        graphxmax +
        " and Min value : " +
        graphxmin
    );
  }
  x = (80 / (graphxmax - graphxmin)) * (value - graphxmin) + 10;
  return x;
}

function graphToScaledX(value, graphxmin, graphxmax, aspectratio) {
  if (aspectratio <= 1) {
    if (graphxmin == graphxmax) {
      graphxmin = graphxmin - 1;
      graphxmax = graphxmax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    if (graphxmin > graphxmax) {
      temp = graphxmin;
      graphxmin = graphxmax;
      graphxmax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    x = (80 / (graphxmax - graphxmin)) * (value - graphxmin) + 10;
  } else {
    if (graphxmin == graphxmax) {
      graphxmin = graphxmin - 1;
      graphxmax = graphxmax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    if (graphxmin > graphxmax) {
      temp = graphxmin;
      graphxmin = graphxmax;
      graphxmax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    vl = (100 * (1 - aspectratio)) / 2 + 10 * aspectratio;
    vh = (100 * (aspectratio + 1)) / 2 - 10 * aspectratio;
    x = ((vh - vl) / (graphxmax - graphxmin)) * (value - graphxmin) + vl;
    // console.log(x)
    // console.log(v1, v2)
    // y - y1 = (y2 - y1)/(x2 - x1) * (x - x1)
    // x = (((v2 - v1)/(90))*(x - 10)) + v1
    // console.log(x)
    // console.log('_')
  }
  return x;
}

function svgToGraphX(percentvalue, graphxmin, graphxmax, aspectratio) {
  if (aspectratio <= 1) {
    if (graphxmin == graphxmax) {
      graphxmin = graphxmin - 1;
      graphxmax = graphxmax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    if (graphxmin > graphxmax) {
      temp = graphxmin;
      graphxmin = graphxmax;
      graphxmax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }

    x = ((percentvalue - 10) * (graphxmax - graphxmin)) / 80 + graphxmin;
  } else {
    if (graphxmin == graphxmax) {
      graphxmin = graphxmin - 1;
      graphxmax = graphxmax + 1;
      console.log(
        "Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    if (graphxmin > graphxmax) {
      temp = graphxmin;
      graphxmin = graphxmax;
      graphxmax = temp;
      console.log(
        "Conversion error, maximum value less than minimum value. Values were swapped. Max value : " +
          graphxmax +
          " and Min value : " +
          graphxmin
      );
    }
    vl = (100 * (1 - aspectratio)) / 2 + 10 * aspectratio;
    vh = (100 * (aspectratio + 1)) / 2 - 10 * aspectratio;

    // x = ((vh - vl)/(graphxmax - graphxmin))*(value - graphxmin) + vl

    x = ((percentvalue - vl) * (graphxmax - graphxmin)) / (vh - vl) + graphxmin;

    // y - y1 = (y2 - y1)/(x2 - x1) * (x - x1)
    // x = (((v2 - v1)/(90))*(x - 10)) + v1
  }
  return x;
}

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function gridtickvalues(valmin, valmax, ticksexpected) {
  expstring = ((valmax - valmin) / ticksexpected).toExponential();
  majorgridorder = parseFloat(
    Math.pow(10, expstring.slice(expstring.indexOf("e") + 1))
  );

  if (expstring.indexOf(".") != -1) {
    majorgriddivision = parseFloat(
      expstring.slice(0, expstring.indexOf(".")) * majorgridorder
    );
  } else {
    majorgriddivision = parseFloat(
      expstring.slice(0, expstring.indexOf("e")) * majorgridorder
    );
  }

  integerchoices = [1, 2, 5, 10];
  for (choice = 0; choice < integerchoices.length - 1; choice++) {
    if (majorgriddivision < integerchoices[choice + 1] * majorgridorder) {
      majorgriddivisionchoice = majorgridorder * integerchoices[choice];
      break;
    }
  }

  if (valmin > 0) {
    majorgridstart =
      Math.ceil(valmin / majorgriddivisionchoice) * majorgriddivisionchoice;
    majorgridstart = majorgridstart - majorgriddivisionchoice;
  } else if (valmin < 0) {
    majorgridstart =
      Math.floor(valmin / majorgriddivisionchoice) * majorgriddivisionchoice;
  } else {
    majorgridstart = majorgriddivisionchoice;
  }

  // majorgridstart = majorgridstart - majorgriddivisionchoice
  // console.log(majorgridstart, (valmax + majorgriddivisionchoice), majorgriddivisionchoice)

  majortickvalues = [];
  for (
    majoraxispoint = majorgridstart;
    majoraxispoint < valmax + majorgriddivisionchoice;
    majoraxispoint = majoraxispoint + majorgriddivisionchoice
  ) {
    majortickvalues.push(majoraxispoint);
  }

  return majortickvalues;
}

function getGraphCursorLocation(cursorpercent, graphname) {
  gdata = graphData[graphname];

  graphEl = document.getElementById(gdata.name);

  valx = svgToGraphX(
    cursorpercent[0],
    gdata.xmin,
    gdata.xmax,
    gdata.aspectratio
  );
  valy = svgToGraphY(
    cursorpercent[1],
    gdata.ymin,
    gdata.ymax,
    gdata.aspectratio
  );

  return [valx, valy];
}

function addLine(graphname, linename, lineoptions) {
  gdata = graphData[graphname];
  lineoptions = lineoptions || {};

  aratio = gdata.aspectratio;

  lineoptions.x1 = parseFloat(lineoptions.x1.toString() || 0);
  lineoptions.y1 = parseFloat(lineoptions.y1.toString() || 0);
  lineoptions.x2 = parseFloat(lineoptions.x2.toString() || 0.5);
  lineoptions.y2 = parseFloat(lineoptions.y2.toString() || 0.5);
  lineoptions.name = linename || uid;

  lineoptions.strokedasharray = lineoptions.strokedasharray || "";
  lineoptions.strokewidth = lineoptions.strokewidth || 1;
  lineoptions.linecolor = lineoptions.linecolor || "hsla(190, 100%, 50%, 1)";

  var lineElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  lineElement.setAttribute(
    "x1",
    graphToScaledX(lineoptions.x1, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  lineElement.setAttribute(
    "y1",
    graphToScaledY(lineoptions.y1, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  lineElement.setAttribute(
    "x2",
    graphToScaledX(lineoptions.x2, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  lineElement.setAttribute(
    "y2",
    graphToScaledY(lineoptions.y2, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  lineElement.setAttribute("stroke-dasharray", lineoptions.strokedasharray);

  lineElement.setAttribute("id", graphname + "-line-" + linename);
  uid = uid + 1;
  lineElement.setAttribute("vector-effect", "non-scaling-stroke");
  lineElement.style.stroke = lineoptions.linecolor;
  lineElement.style.strokeWidth = lineoptions.strokewidth + "%";
  gdata.svgElement.appendChild(lineElement);

  graphData[graphname].lineData[linename] = [lineElement, lineoptions];
  return [lineElement, lineoptions];
}

function addPath(graphname, pathname, pathoptions) {
  gdata = graphData[graphname];
  pathoptions = pathoptions || {};

  aratio = gdata.aspectratio;

  pathoptions.points = pathoptions.points || [
    [0, 1],
    [1, 0],
  ];

  pathstring = "M";

  for (pth = 0; pth < pathoptions.points.length; pth++) {
    if (pth == 0) {
      pathstring =
        pathstring +
        graphToScaledX(
          pathoptions.points[pth][0],
          gdata.xmin,
          gdata.xmax,
          aratio
        ) +
        " " +
        graphToScaledY(
          pathoptions.points[pth][1],
          gdata.ymin,
          gdata.ymax,
          aratio
        ) +
        " ";
    } else {
      pathstring =
        pathstring +
        "L" +
        graphToScaledX(
          pathoptions.points[pth][0],
          gdata.xmin,
          gdata.xmax,
          aratio
        ) +
        " " +
        graphToScaledY(
          pathoptions.points[pth][1],
          gdata.ymin,
          gdata.ymax,
          aratio
        ) +
        " ";
    }
  }

  pathoptions.name = pathname || uid;
  // console.log((0).toString() || 0.5)

  pathoptions.strokewidth = pathoptions.strokewidth || 1;
  pathoptions.pathcolor = pathoptions.pathcolor || "hsla(190, 100%, 50%, 1)";

  var pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  try {
    pathElement.setAttribute("d", pathstring);
    pathElement.setAttribute("id", graphname + "-path-" + pathname);
    uid = uid + 1;
    pathElement.style.stroke = pathoptions.pathcolor;
    pathElement.style.fill = "none";
    pathElement.style.strokeWidth = pathoptions.strokewidth + "%";
    gdata.svgElement.appendChild(pathElement);

    graphData[graphname].pathData[pathname] = [pathElement, pathoptions];
    return [pathElement, pathoptions];
  } catch (err) {
    console.log(pathoptions.points);
  }
}

function updatePath(graphname, pathname, newpathoptions) {
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  pathoptions = gdata.pathData[pathname][1];
  pathElement = gdata.pathData[pathname][0];

  pathoptions.points = newpathoptions.points || pathoptions.points;

  pathstring = "M";

  for (pth = 0; pth < pathoptions.points.length; pth++) {
    if (pth == 0) {
      pathstring =
        pathstring +
        graphToScaledX(
          pathoptions.points[pth][0],
          gdata.xmin,
          gdata.xmax,
          aratio
        ) +
        " " +
        graphToScaledY(
          pathoptions.points[pth][1],
          gdata.ymin,
          gdata.ymax,
          aratio
        ) +
        " ";
    } else {
      pathstring =
        pathstring +
        "L" +
        graphToScaledX(
          pathoptions.points[pth][0],
          gdata.xmin,
          gdata.xmax,
          aratio
        ) +
        " " +
        graphToScaledY(
          pathoptions.points[pth][1],
          gdata.ymin,
          gdata.ymax,
          aratio
        ) +
        " ";
    }
  }

  try {
    pathElement.setAttribute("d", pathstring);
    pathoptions.strokewidth =
      newpathoptions.strokewidth || pathoptions.strokewidth;
    pathoptions.pathcolor = newpathoptions.pathcolor || pathoptions.pathcolor;

    pathElement.style.stroke = pathoptions.pathcolor;
    pathElement.style.fill = "none";
    pathElement.style.strokeWidth = pathoptions.strokewidth + "%";

    graphData[graphname].pathData[pathname] = [pathElement, pathoptions];
  } catch (err) {
    console.log(newpathoptions.points);
  }
}

function updatePathPoints(graphname, pathname, npathpoints) {
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  pathoptions = gdata.pathData[pathname][1];
  pathElement = gdata.pathData[pathname][0];

  pathoptions.points = npathpoints || pathoptions.points;

  if (pathoptions.points.length > 0) {
    pathstring = "M";

    for (pth = 0; pth < pathoptions.points.length; pth++) {
      if (pth == 0) {
        pathstring =
          pathstring +
          graphToScaledX(
            pathoptions.points[pth][0],
            gdata.xmin,
            gdata.xmax,
            aratio
          ) +
          " " +
          graphToScaledY(
            pathoptions.points[pth][1],
            gdata.ymin,
            gdata.ymax,
            aratio
          ) +
          " ";
      } else {
        pathstring =
          pathstring +
          "L" +
          graphToScaledX(
            pathoptions.points[pth][0],
            gdata.xmin,
            gdata.xmax,
            aratio
          ) +
          " " +
          graphToScaledY(
            pathoptions.points[pth][1],
            gdata.ymin,
            gdata.ymax,
            aratio
          ) +
          " ";
      }
    }

    try {
      pathElement.setAttribute("d", pathstring);
      graphData[graphname].pathData[pathname] = [pathElement, pathoptions];
      return [pathElement, pathoptions];
    } catch (err) {
      console.log(npathpoints);
    }
  }
}

function updateLine(graphname, linename, linevalues) {
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  lineoptions = gdata.lineData[linename][1];
  lineElement = gdata.lineData[linename][0];

  if (linevalues.x1 != 0) {
    lineoptions.x1 = linevalues.x1 || lineoptions.x1;
  } else {
    lineoptions.x1 = linevalues.x1;
  }

  if (linevalues.y1 != 0) {
    lineoptions.y1 = linevalues.y1 || lineoptions.y1;
  } else {
    lineoptions.y1 = linevalues.y1;
  }

  if (linevalues.x2 != 0) {
    lineoptions.x2 = linevalues.x2 || lineoptions.x2;
  } else {
    lineoptions.x2 = linevalues.x2;
  }

  if (linevalues.y2 != 0) {
    lineoptions.y2 = linevalues.y2 || lineoptions.y2;
  } else {
    lineoptions.y2 = linevalues.y2;
  }

  lineoptions.strokedasharray =
    linevalues.strokedasharray || lineoptions.strokedasharray;
  lineoptions.strokewidth = linevalues.strokewidth || lineoptions.strokewidth;
  lineoptions.linecolor = linevalues.linecolor || lineoptions.linecolor;

  lineElement.setAttribute(
    "x1",
    graphToScaledX(lineoptions.x1, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  lineElement.setAttribute(
    "y1",
    graphToScaledY(lineoptions.y1, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  lineElement.setAttribute(
    "x2",
    graphToScaledX(lineoptions.x2, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  lineElement.setAttribute(
    "y2",
    graphToScaledY(lineoptions.y2, gdata.ymin, gdata.ymax, aratio) + "%"
  );

  lineElement.setAttribute("stroke-dasharray", lineoptions.strokedasharray);
  lineElement.style.stroke = lineoptions.linecolor;
  lineElement.style.strokeWidth = lineoptions.strokewidth + "%";

  graphData[graphname].lineData[linename] = [lineElement, lineoptions];
}

function distanceBTWgraphToSvg(p1, p2, xmin, xmax, ymin, ymax, aspectratio) {
  pt1 = [
    graphToScaledX(p1[0], xmin, xmax, aspectratio),
    graphToScaledY(p1[1], ymin, ymax, aspectratio),
  ];
  pt2 = [
    graphToScaledX(p2[0], xmin, xmax, aspectratio),
    graphToScaledY(p2[1], ymin, ymax, aspectratio),
  ];

  return Math.pow(
    Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2),
    0.5
  );
}

function addCircle(graphname, circlename, circleoptions) {
  gdata = graphData[graphname];
  circleoptions = circleoptions || {};
  aratio = gdata.aspectratio;

  if (circleoptions.x != 0) {
    circleoptions.x = circleoptions.x || 0.3;
  } else {
    circleoptions.x = 0;
  }

  if (circleoptions.y != 0) {
    circleoptions.y = circleoptions.y || 0.3;
  } else {
    circleoptions.y = 0;
  }

  if (circleoptions.radius != 0) {
    circleoptions.radius = circleoptions.radius || 0.3;
  } else {
    circleoptions.radius = 0;
  }

  circleoptions.name = circlename || uid;

  circleoptions.stroke = circleoptions.stroke || "hsla(190, 100%, 50%, 0.5)";
  circleoptions.strokewidth = circleoptions.strokewidth || 0.1;

  circleoptions.circlecolor =
    circleoptions.circlecolor || "hsla(190, 100%, 50%, 1)";

  rx = distanceBTWgraphToSvg(
    [0, 0],
    [circleoptions.radius, 0],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );
  ry = distanceBTWgraphToSvg(
    [0, 0],
    [0, circleoptions.radius],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );

  var circleElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse"
  );
  circleElement.setAttribute(
    "cx",
    graphToScaledX(circleoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  circleElement.setAttribute(
    "cy",
    graphToScaledY(circleoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  circleElement.setAttribute("rx", rx + "%");
  circleElement.setAttribute("ry", ry + "%");
  circleElement.setAttribute("id", graphname + "-circle-" + circlename);
  uid = uid + 1;
  circleElement.setAttribute("vector-effect", "non-scaling-stroke");
  circleElement.style.fill = circleoptions.circlecolor;
  circleElement.style.strokeWidth = circleoptions.strokewidth + "%";
  circleElement.style.stroke = circleoptions.stroke;
  circleElement.setAttribute("stroke-dasharray", circleoptions.strokedasharray);
  gdata.svgElement.appendChild(circleElement);

  graphData[graphname].circleData[circlename] = [circleElement, circleoptions];
  return [circleElement, circleoptions];
}

function updateCircle(graphname, circlename, circlenewvalues) {
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  circleoptions = gdata.circleData[circlename][1];
  circleElement = gdata.circleData[circlename][0];

  if (circleoptions.x != 0) {
    circleoptions.x = circlenewvalues.x || circleoptions.x;
  } else {
    circleoptions.x = circlenewvalues.x;
  }

  if (circleoptions.y != 0) {
    circleoptions.y = circlenewvalues.y || circleoptions.y;
  } else {
    circleoptions.y = circlenewvalues.y;
  }

  if (circleoptions.radius != 0) {
    circleoptions.radius = circlenewvalues.radius || circleoptions.radius;
  } else {
    circleoptions.radius = circlenewvalues.radius;
  }

  circleoptions.name = circlename || uid;

  circleoptions.stroke = circlenewvalues.stroke || circleoptions.stroke;
  circleoptions.strokewidth =
    circlenewvalues.strokewidth || circleoptions.strokewidth;

  circleoptions.circlecolor =
    circlenewvalues.circlecolor || circleoptions.circlecolor;

  rx = distanceBTWgraphToSvg(
    [0, 0],
    [circleoptions.radius, 0],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );
  ry = distanceBTWgraphToSvg(
    [0, 0],
    [0, circleoptions.radius],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );

  circleElement.setAttribute(
    "cx",
    graphToScaledX(circleoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  circleElement.setAttribute(
    "cy",
    graphToScaledY(circleoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  circleElement.setAttribute("rx", rx + "%");
  circleElement.setAttribute("ry", ry + "%");
  circleElement.setAttribute("id", graphname + "-circle-" + circlename);
  uid = uid + 1;
  circleElement.setAttribute("vector-effect", "non-scaling-stroke");
  circleElement.style.fill = circleoptions.circlecolor;
  circleElement.style.strokeWidth = circleoptions.strokewidth + "%";
  circleElement.style.stroke = circleoptions.stroke;
  circleElement.setAttribute("stroke-dasharray", circleoptions.strokedasharray);

  graphData[graphname].circleData[circlename] = [circleElement, circleoptions];
}

function addEllipse(graphname, ellipsename, ellipseoptions) {
  gdata = graphData[graphname];

  aratio = gdata.aspectratio;

  ellipseoptions = ellipseoptions || {};

  ellipseoptions.x = parseFloat(ellipseoptions.x.toString() || 0);
  ellipseoptions.y = parseFloat(ellipseoptions.y.toString() || 0);
  ellipseoptions.rx = parseFloat(ellipseoptions.rx.toString() || 0.3);
  ellipseoptions.ry = parseFloat(ellipseoptions.ry.toString() || 8);
  ellipseoptions.name = ellipsename || uid;

  ellipseoptions.stroke = ellipseoptions.stroke || "hsla(190, 100%, 50%, 0.5)";
  ellipseoptions.strokewidth = ellipseoptions.strokewidth || 0.1;

  ellipseoptions.ellipsecolor =
    ellipseoptions.ellipsecolor || "hsla(190, 100%, 50%, 1)";

  rx = distanceBTWgraphToSvg(
    [0, 0],
    [ellipseoptions.rx, 0],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );
  ry = distanceBTWgraphToSvg(
    [0, 0],
    [0, ellipseoptions.ry],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );

  var ellipseElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse"
  );
  ellipseElement.setAttribute(
    "cx",
    graphToScaledX(ellipseoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  ellipseElement.setAttribute(
    "cy",
    graphToScaledY(ellipseoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  ellipseElement.setAttribute("rx", rx + "%");
  ellipseElement.setAttribute("ry", ry + "%");
  ellipseElement.setAttribute("id", graphname + "-ellipse-" + ellipsename);
  uid = uid + 1;
  ellipseElement.setAttribute("vector-effect", "non-scaling-stroke");
  ellipseElement.style.fill = ellipseoptions.ellipsecolor;
  ellipseElement.style.strokeWidth = ellipseoptions.strokewidth + "%";
  ellipseElement.style.stroke = ellipseoptions.stroke;
  gdata.svgElement.appendChild(ellipseElement);

  graphData[graphname].ellipseData[ellipsename] = [
    ellipseElement,
    ellipseoptions,
  ];
  return [ellipseElement, ellipseoptions];
}

function updateEllipse(graphname, ellipsename, ellipsenewvalues) {
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  ellipseoptions = gdata.ellipseData[ellipsename][1];
  ellipseElement = gdata.ellipseData[ellipsename][0];

  if (ellipseoptions.x != 0) {
    ellipseoptions.x = ellipsenewvalues.x || ellipseoptions.x;
  } else {
    ellipseoptions.x = 0;
  }

  if (ellipseoptions.y != 0) {
    ellipseoptions.y = ellipsenewvalues.y || ellipseoptions.y;
  } else {
    ellipseoptions.y = 0;
  }

  if (ellipseoptions.rx != 0) {
    ellipseoptions.rx = ellipsenewvalues.rx || ellipseoptions.rx;
  } else {
    ellipseoptions.rx = 0;
  }
  if (ellipseoptions.ry != 0) {
    ellipseoptions.ry = ellipsenewvalues.ry || ellipseoptions.ry;
  } else {
    ellipseoptions.ry = 0;
  }

  ellipseoptions.name = ellipsename || uid;

  ellipseoptions.stroke = ellipsenewvalues.stroke || ellipseoptions.stroke;
  ellipseoptions.strokewidth =
    ellipsenewvalues.strokewidth || ellipseoptions.strokewidth;

  ellipseoptions.ellipsecolor =
    ellipsenewvalues.ellipsecolor || ellipseoptions.ellipsecolor;

  rx = distanceBTWgraphToSvg(
    [0, 0],
    [ellipseoptions.rx, 0],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );
  ry = distanceBTWgraphToSvg(
    [0, 0],
    [0, ellipseoptions.ry],
    gdata.xmin,
    gdata.xmax,
    gdata.ymin,
    gdata.ymax,
    aratio
  );

  ellipseElement.setAttribute(
    "cx",
    graphToScaledX(ellipseoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  ellipseElement.setAttribute(
    "cy",
    graphToScaledY(ellipseoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  ellipseElement.setAttribute("rx", rx + "%");
  ellipseElement.setAttribute("ry", ry + "%");
  ellipseElement.setAttribute("id", graphname + "-ellipse-" + ellipsename);
  uid = uid + 1;
  ellipseElement.setAttribute("vector-effect", "non-scaling-stroke");
  ellipseElement.style.fill = ellipseoptions.ellipsecolor;
  ellipseElement.style.strokeWidth = ellipseoptions.strokewidth + "%";
  ellipseElement.style.stroke = ellipseoptions.stroke;
  gdata.svgElement.appendChild(ellipseElement);

  graphData[graphname].ellipseData[ellipsename] = [
    ellipseElement,
    ellipseoptions,
  ];
}

function addText(graphname, textname, textoptions) {
  gdata = graphData[graphname];
  textoptions = textoptions || {};

  aratio = gdata.aspectratio;

  textoptions.x = parseFloat(textoptions.x.toString() || 0);
  textoptions.y = parseFloat(textoptions.y.toString() || 0);
  textoptions.text = textoptions.text || "";
  textoptions.name = textname || uid;

  textoptions.textAlign = textoptions.textAlign || "left";
  textoptions.fontSize = textoptions.fontSize || 12;
  textoptions.fontFamily = textoptions.fontFamily || "Source Sans Pro";

  textoptions.textcolor = textoptions.textcolor || "hsla(190, 100%, 0%, 1)";

  var textElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  textElement.setAttribute(
    "x",
    graphToScaledX(textoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  textElement.setAttribute(
    "y",
    graphToScaledY(textoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  textElement.setAttribute("id", graphname + "-text-" + textname);
  uid = uid + 1;
  textElement.setAttribute("vector-effect", "non-scaling-stroke");
  textElement.style.fill = textoptions.textcolor;
  textElement.innerHTML = textoptions.text;
  textElement.style.fontFamily = textoptions.fontFamily;
  textElement.style.fontSize = textoptions.fontSize;
  if (textoptions.textAlign == "center") {
    textElement.setAttribute("text-anchor", "middle");
  }
  gdata.svgElement.appendChild(textElement);

  graphData[graphname].textData[textname] = [textElement, textoptions];
  return [textElement, textoptions];
}

function updateText(graphname, textname, textvalues) {
  gdata = graphData[graphname];

  aratio = gdata.aspectratio;

  textoptions = gdata.textData[textname][1];
  textElement = gdata.textData[textname][0];

  textoptions.text = textvalues.text || textoptions.text;
  textoptions.x = textvalues.x || textoptions.x;
  textoptions.y = textvalues.y || textoptions.y;
  textoptions.textcolor = textvalues.textcolor || textoptions.textcolor;
  textoptions.fontSize = textvalues.fontSize || textoptions.fontSize;

  textElement.innerHTML = textoptions.text;
  textElement.setAttribute(
    "x",
    graphToScaledX(textoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  textElement.setAttribute(
    "y",
    graphToScaledY(textoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  textElement.style.fill = textoptions.textcolor;
  textElement.style.fontSize = textoptions.fontSize;

  graphData[graphname].textData[textname] = [textElement, textoptions];
  return [textElement, textoptions];
}

function addPoint(graphname, pointname, pointoptions) {
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  pointoptions = pointoptions || {};

  if (pointoptions.x != 0) {
    pointoptions.x = pointoptions.x || 0.3;
  }
  if (pointoptions.y != 0) {
    pointoptions.y = pointoptions.y || 0.3;
  }
  // pointoptions.y = pointoptions.y || 0.3
  pointoptions.pointsize = pointoptions.pointsize || 0.7;
  pointoptions.name = pointname || uid;

  pointoptions.pointcolor =
    pointoptions.pointcolor || "hsla(190, 100%, 50%, 1)";

  var pointElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse"
  );
  pointElement.setAttribute(
    "cx",
    graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  pointElement.setAttribute(
    "cy",
    graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  pointElement.setAttribute("rx", pointoptions.pointsize + "%");
  pointElement.setAttribute("ry", pointoptions.pointsize + "%");
  pointElement.setAttribute("id", graphname + "-point-" + pointname);
  uid = uid + 1;
  pointElement.setAttribute("vector-effect", "non-scaling-stroke");
  pointElement.style.fill = pointoptions.pointcolor;
  gdata.svgElement.appendChild(pointElement);

  pointoptions.draggability = pointoptions.draggability || "no";
  if (pointoptions.draggability == "yes") {
    pointoptions.currentlyDraggable = pointoptions.currentlyDraggable || "yes";
  } else {
    pointoptions.currentlyDraggable = pointoptions.currentlyDraggable || "no";
  }
  pointoptions.runFunctionOnDragEnd = pointoptions.runFunctionOnDragEnd || "";
  pointoptions.runFunctionDuringDrag = pointoptions.runFunctionDuringDrag || "";

  if (pointoptions.draggability == "yes") {
    pointElement.addEventListener("mousedown", pointDrag);
    pointElement.addEventListener("touchstart", pointDrag);
    gdata.svgElement.addEventListener("touchmove", graphTouchDisable);
  } else {
    pointElement.style.pointerEvents = "none";
  }

  pointoptions.dragDirection = pointoptions.dragDirection || "bothXY";
  pointoptions.dragIfCondition = pointoptions.dragIfCondition || "true";

  graphData[graphname].pointData[pointname] = [pointElement, pointoptions];
  reverseGraphElementMap[pointElement.id] = [graphname, pointname];
  return [pointElement, pointoptions];
}

function updatePoint(graphname, pointname, newpointoptions) {
  gdata = graphData[graphname];
  pointoptions = gdata.pointData[pointname][1];
  pointElement = gdata.pointData[pointname][0];
  aratio = gdata.aspectratio;

  if (pointoptions.x != 0) {
    pointoptions.x = newpointoptions.x || pointoptions.x;
  }
  if (pointoptions.y != 0) {
    pointoptions.y = newpointoptions.x || pointoptions.y;
  }
  // pointoptions.y = pointoptions.y || 0.3
  pointoptions.pointsize = newpointoptions.pointsize || pointoptions.pointsize;

  pointoptions.pointcolor =
    newpointoptions.pointcolor || pointoptions.pointcolor;

  pointElement.setAttribute(
    "cx",
    graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  pointElement.setAttribute(
    "cy",
    graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );
  pointElement.setAttribute("rx", pointoptions.pointsize + "%");
  pointElement.setAttribute("ry", pointoptions.pointsize + "%");
  pointElement.setAttribute("vector-effect", "non-scaling-stroke");
  pointElement.style.fill = pointoptions.pointcolor;

  pointoptions.draggability = newpointoptions.draggability || "no";
  if (pointoptions.draggability == "yes") {
    pointoptions.currentlyDraggable =
      newpointoptions.currentlyDraggable || "yes";
  } else {
    pointoptions.currentlyDraggable =
      newpointoptions.currentlyDraggable || "no";
  }
  pointoptions.runFunctionOnDragEnd =
    newpointoptions.runFunctionOnDragEnd || "";
  pointoptions.runFunctionDuringDrag =
    newpointoptions.runFunctionDuringDrag || "";
  pointoptions.dragDirection = newpointoptions.dragDirection || "bothXY";
  pointoptions.dragIfCondition = newpointoptions.dragIfCondition || "";

  if (pointoptions.draggability == "yes") {
    pointElement.addEventListener("mousedown", pointDrag);
    pointElement.addEventListener("touchstart", pointDrag);
  } else {
    pointElement.removeEventListener("mousedown", pointDrag);
    pointElement.removeEventListener("touchstart", pointDrag);
  }

  graphData[graphname].pointData[pointname] = [pointElement, pointoptions];
}

function updatePointXY(graphname, pointname, xvalue, yvalue) {
  pointElement = document.getElementById(graphname + "-point-" + pointname);
  gdata = graphData[graphname];
  aratio = gdata.aspectratio;

  pointoptions = graphData[graphname].pointData[pointname][1];

  pointoptions.x = xvalue;
  pointoptions.y = yvalue;

  pointElement.setAttribute(
    "cx",
    graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + "%"
  );
  pointElement.setAttribute(
    "cy",
    graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + "%"
  );

  graphData[graphname].pointData[pointname] = [pointElement, pointoptions];
}

function removePoint(graphname, pointname) {
  pointElement = document.getElementById(graphname + "-point-" + pointname);

  pointElement.outerHTML = "";
  delete graphData[graphname].pointData[pointname];
}

function removeLine(graphname, linename) {
  lineElement = document.getElementById(graphname + "-line-" + linename);
  lineElement.outerHTML = "";
  delete graphData[graphname].lineData[linename];
}

function removeCircle(graphname, circlename) {
  circleElement = document.getElementById(graphname + "-circle-" + circlename);
  circleElement.outerHTML = "";
  delete graphData[graphname].circleData[circlename];
}

function removeText(graphname, textname) {
  textElement = document.getElementById(graphname + "-text-" + textname);
  textElement.outerHTML = "";
  delete graphData[graphname].textData[textname];
}

function removePath(graphname, pathname) {
  pathElement = document.getElementById(graphname + "-path-" + pathname);
  pathElement.outerHTML = "";
  delete graphData[graphname].pathData[pathname];
}

function removeGraph(graphname) {
  graphElement = document.getElementById(graphname);
  graphElement.outerHTML = "";
  delete graphData[graphname];
}

function deleteSegments(collection) {
  if (typeof collection != "undefined") {
    for (f = 0; f < collection.length; f++) {
      collection[f].outerHTML = "";
    }
  }
}

function randomChoice(choicearray) {
  return choicearray[parseInt(Math.random() * choicearray.length)];
}

function randomWeightedChoice(choicearray, weightArray) {
  if (choicearray.length == weightArray.length) {
    weightSumA = weightArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    weightvalueChosen = Math.random() * weightSumA;
    weightSumZ = 0;
    for (weightIndex = 0; weightIndex < weightArray.length; weightIndex++) {
      weightSumZ = weightSumZ + weightArray[weightIndex];
      if (weightSumZ >= weightvalueChosen) {
        indexchosenW = weightIndex;
        break;
      }
    }
    return choicearray[indexchosenW];
  }
}

function linearValue(xv1, xv2, yv1, yv2, inputvl) {
  return yv1 + ((inputvl - xv1) / (xv2 - xv1)) * (yv2 - yv1);
}

currentMovingPoint = "";
function pointDrag(event) {
  gphname = reverseGraphElementMap[event.target.id][0];
  ptname = reverseGraphElementMap[event.target.id][1];
  if (graphData[gphname].pointData[ptname][1].currentlyDraggable == "yes") {
    if (graphData[gphname].currentlyDraggableGraph == "yes") {
      document
        .getElementById(gphname)
        .removeEventListener("mousedown", graphDragHandle);
      document
        .getElementById(gphname)
        .removeEventListener("touchstart", graphDragHandle);
    }
    event.target.removeEventListener("mousedown", pointDrag);
    event.target.removeEventListener("touchstart", pointDrag);
    window.addEventListener("mousemove", pointMoveEvent);
    window.addEventListener("mouseup", pointUpEvent);
    event.preventDefault();
    window.addEventListener("touchmove", pointMoveEvent, { passive: false });
    window.addEventListener("touchend", pointUpEvent);
    // window.addEventListener('mouseout', pointUpEvent)
    currentMovingPoint = event.target;
  }
}
svgPTVariable = {};

function pointMoveEvent(event) {
  event.preventDefault();
  gphname = reverseGraphElementMap[currentMovingPoint.id][0];
  ptname = reverseGraphElementMap[currentMovingPoint.id][1];
  var rect = document.getElementById(gphname).getBoundingClientRect();
  posx = event.clientX - rect.left;
  posy = event.clientY - rect.top;
  svgPTVariable[gphname].x = event.clientX;
  svgPTVariable[gphname].y = event.clientY;

  if (event.clientX == undefined) {
    posx = event.changedTouches[0].clientX - rect.left;
    posy = event.changedTouches[0].clientY - rect.top;
    svgPTVariable[gphname].x = event.changedTouches[0].clientX;
    svgPTVariable[gphname].y = event.changedTouches[0].clientY;
  }

  var cursorpt = svgPTVariable[gphname].matrixTransform(
    document.getElementById(gphname).getScreenCTM().inverse()
  );

  moveX = svgToGraphX(
    cursorpt.x,
    graphData[gphname].xmin,
    graphData[gphname].xmax,
    graphData[gphname].aspectratio
  );
  moveY = svgToGraphY(
    cursorpt.y,
    graphData[gphname].ymin,
    graphData[gphname].ymax,
    graphData[gphname].aspectratio
  );

  if (
    typeof eval(graphData[gphname].pointData[ptname][1].dragIfCondition) !=
    undefined
  ) {
    if (eval(graphData[gphname].pointData[ptname][1].dragIfCondition) == true) {
      if (graphData[gphname].pointData[ptname][1].dragDirection == "bothXY") {
        updatePointXY(gphname, ptname, moveX, moveY);
        eval(graphData[gphname].pointData[ptname][1].runFunctionDuringDrag);
      } else if (
        graphData[gphname].pointData[ptname][1].dragDirection == "onlyY"
      ) {
        updatePointXY(
          gphname,
          ptname,
          graphData[gphname].pointData[ptname][1].x,
          moveY
        );
        eval(graphData[gphname].pointData[ptname][1].runFunctionDuringDrag);
      } else if (
        graphData[gphname].pointData[ptname][1].dragDirection == "onlyX"
      ) {
        updatePointXY(
          gphname,
          ptname,
          moveX,
          graphData[gphname].pointData[ptname][1].y
        );
        eval(graphData[gphname].pointData[ptname][1].runFunctionDuringDrag);
      }
    }
  }
}

function pointUpEvent(event) {
  gphname = reverseGraphElementMap[currentMovingPoint.id][0];
  ptname = reverseGraphElementMap[currentMovingPoint.id][1];
  if (graphData[gphname].currentlyDraggableGraph == "yes") {
    document
      .getElementById(gphname)
      .addEventListener("mousedown", graphDragHandle);
    document
      .getElementById(gphname)
      .addEventListener("touchstart", graphDragHandle);
  }
  currentMovingPoint.addEventListener("mousedown", pointDrag);
  currentMovingPoint.addEventListener("touchstart", pointDrag);
  window.removeEventListener("mousemove", pointMoveEvent);
  window.removeEventListener("mouseup", pointUpEvent);
  window.removeEventListener("touchmove", pointMoveEvent);
  window.removeEventListener("touchend", pointUpEvent);

  // window.removeEventListener('mouseout', pointUpEvent)
  eval(graphData[gphname].pointData[ptname][1].runFunctionOnDragEnd);
}

function wheelHandle(event) {
  event.preventDefault();
  whlvalue = event.wheelDeltaY / Math.abs(event.wheelDeltaY);
  if (event.wheelDeltaY == undefined) {
    whlvalue = event.deltaY / Math.abs(event.deltaY);
    // For FireFox
  }
  scalefactorup = 1.1;
  scalefactordown = 0.9;

  if (graphData[event.target.id.split("-")[0]] == undefined) {
  } else {
    gdata = graphData[event.target.id.split("-")[0]];

    scale = gdata.ymax - gdata.ymin;
    expstring = scale.toExponential().toString();
    ordery = expstring.slice(expstring.indexOf("e") + 1) * -1;
    // console.log(ordery)

    scale = gdata.xmax - gdata.xmin;
    expstring = scale.toExponential().toString();
    orderx = expstring.slice(expstring.indexOf("e") + 1) * -1;
    // console.log(orderx)

    gphname = gdata.name;

    var rect = document.getElementById(gphname).getBoundingClientRect();
    posx = event.clientX - rect.left;
    posy = event.clientY - rect.top;
    svgPTVariable[gphname].x = event.clientX;
    svgPTVariable[gphname].y = event.clientY;

    if (event.clientX == undefined) {
      posx = event.changedTouches[0].clientX - rect.left;
      posy = event.changedTouches[0].clientY - rect.top;
      svgPTVariable[gphname].x = event.changedTouches[0].clientX;
      svgPTVariable[gphname].y = event.changedTouches[0].clientY;
    }

    var cursorpt = svgPTVariable[gphname].matrixTransform(
      document.getElementById(gphname).getScreenCTM().inverse()
    );

    zoomlocationX = svgToGraphX(
      cursorpt.x,
      graphData[gphname].xmin,
      graphData[gphname].xmax,
      graphData[gphname].aspectratio
    );
    zoomlocationY = svgToGraphY(
      cursorpt.y,
      graphData[gphname].ymin,
      graphData[gphname].ymax,
      graphData[gphname].aspectratio
    );

    currentvalues = graphData[gphname];

    posx = posx / rect.width;
    posy = posy / rect.height;

    if (posx > 0.11 && posx < 0.89 && posy > 0.11 && posy < 0.89) {
      if (whlvalue < 0) {
        scaleupdownFactor = scalefactorup;
        leftX = (zoomlocationX - currentvalues.xmin) * scaleupdownFactor;
        newZXmin = zoomlocationX - leftX;
        rightX = (currentvalues.xmax - zoomlocationX) * scaleupdownFactor;
        newZXmax = zoomlocationX + rightX;
        leftY = (zoomlocationY - currentvalues.ymin) * scaleupdownFactor;
        newZYmin = zoomlocationY - leftY;
        rightY = (currentvalues.ymax - zoomlocationY) * scaleupdownFactor;
        newZYmax = zoomlocationY + rightY;

        options = {};
        options.xmin = newZXmin;
        options.xmax = newZXmax;
        options.ymin = newZYmin;
        options.ymax = newZYmax;

        updateGraphZoom(gphname, options);
      } else if (whlvalue >= 0 && orderx < 14 && ordery < 14) {
        scaleupdownFactor = scalefactordown;
        leftX = (zoomlocationX - currentvalues.xmin) * scaleupdownFactor;
        newZXmin = zoomlocationX - leftX;
        rightX = (currentvalues.xmax - zoomlocationX) * scaleupdownFactor;
        newZXmax = zoomlocationX + rightX;
        leftY = (zoomlocationY - currentvalues.ymin) * scaleupdownFactor;
        newZYmin = zoomlocationY - leftY;
        rightY = (currentvalues.ymax - zoomlocationY) * scaleupdownFactor;
        newZYmax = zoomlocationY + rightY;

        options = {};
        options.xmin = newZXmin;
        options.xmax = newZXmax;
        options.ymin = newZYmin;
        options.ymax = newZYmax;
        updateGraphZoom(gphname, options);
      }
    }
  }
}

currentMovingGraph = "";
currentMovingGraphStartLocation = [];

function graphDragHandle(event) {
  event.preventDefault();
  gphname = event.target.id.split("-")[0];
  if (graphData[gphname].currentlyDraggableGraph == "yes") {
    graphData[gphname].svgElement.removeEventListener(
      "mousedown",
      graphDragHandle
    );
    graphData[gphname].svgElement.removeEventListener(
      "touchstart",
      graphDragHandle
    );
    window.addEventListener("mousemove", graphDragMoveEvent);
    window.addEventListener("mouseup", graphDragUpEvent);
    event.preventDefault();
    window.addEventListener("touchmove", graphDragMoveEvent, {
      passive: false,
    });
    window.addEventListener("touchend", graphDragUpEvent);
    // window.addEventListener('mouseout', pointUpEvent)
    currentMovingGraph = graphData[gphname].svgElement;

    var rect = document.getElementById(gphname).getBoundingClientRect();
    posx = event.clientX - rect.left;
    posy = event.clientY - rect.top;
    svgPTVariable[gphname].x = event.clientX;
    svgPTVariable[gphname].y = event.clientY;

    if (event.clientX == undefined) {
      posx = event.changedTouches[0].clientX - rect.left;
      posy = event.changedTouches[0].clientY - rect.top;
      svgPTVariable[gphname].x = event.changedTouches[0].clientX;
      svgPTVariable[gphname].y = event.changedTouches[0].clientY;
    }

    var cursorpt = svgPTVariable[gphname].matrixTransform(
      document.getElementById(gphname).getScreenCTM().inverse()
    );

    tapX = svgToGraphX(
      cursorpt.x,
      graphData[gphname].xmin,
      graphData[gphname].xmax,
      graphData[gphname].aspectratio
    );
    tapY = svgToGraphY(
      cursorpt.y,
      graphData[gphname].ymin,
      graphData[gphname].ymax,
      graphData[gphname].aspectratio
    );

    currentMovingGraphStartLocation = [tapX, tapY];
    currentMovingGraphOriginalBounds = [
      graphData[gphname].xmin,
      graphData[gphname].xmax,
      graphData[gphname].ymin,
      graphData[gphname].ymax,
    ];

    currentMovingGraph.style.cursor = "move";
  }
}

function clientToGraph(clientValues, graphNameInput) {
  svgPTVariable[graphNameInput].x = clientValues[0];
  svgPTVariable[graphNameInput].y = clientValues[1];

  var cursorpt = svgPTVariable[gphname].matrixTransform(
    document.getElementById(gphname).getScreenCTM().inverse()
  );

  return [
    svgToGraphX(
      cursorpt.x,
      graphData[gphname].xmin,
      graphData[gphname].xmax,
      graphData[gphname].aspectratio
    ),
    svgToGraphY(
      cursorpt.y,
      graphData[gphname].ymin,
      graphData[gphname].ymax,
      graphData[gphname].aspectratio
    ),
  ];
}

function graphPinchMoveEvent(event) {
  if (event.changedTouches.length == 2) {
    gphname = event.target.id.split("-")[0];
    touch1 = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
    touch2 = [event.changedTouches[1].clientX, event.changedTouches[1].clientY];

    touch1 = clientToGraph(touch1, gphname);
    touch2 = clientToGraph(touch2, gphname);

    oldtouch1 = clientToGraph(pinchStartData[0], gphname);
    oldtouch2 = clientToGraph(pinchStartData[1], gphname);

    pinchScale = distF(oldtouch1, oldtouch2) / distF(touch1, touch2);
    pinchStartMidpoint = [
      (oldtouch1[0] + oldtouch2[0]) / 2,
      (oldtouch1[1] + oldtouch2[1]) / 2,
    ];

    zoomlocationX = pinchStartMidpoint[0];
    zoomlocationY = pinchStartMidpoint[1];

    gdata = graphData[gphname];

    scale = gdata.ymax - gdata.ymin;
    expstring = scale.toExponential().toString();
    ordery = expstring.slice(expstring.indexOf("e") + 1) * -1;
    // console.log(ordery)

    scale = gdata.xmax - gdata.xmin;
    expstring = scale.toExponential().toString();
    orderx = expstring.slice(expstring.indexOf("e") + 1) * -1;
    // console.log(orderx)

    currentvalues = graphData[gphname];

    scaleFactorForTouch = 1;
    if (pinchScale <= 1) {
      scaleFactorForTouch = linearValue(0, 1, 0.9, 1, pinchScale);
    } else {
      scaleFactorForTouch = linearValue(1, 5, 1, 1.1, pinchScale);
    }

    leftX = (zoomlocationX - currentvalues.xmin) * scaleFactorForTouch;
    newZXmin = zoomlocationX - leftX;
    rightX = (currentvalues.xmax - zoomlocationX) * scaleFactorForTouch;
    newZXmax = zoomlocationX + rightX;
    leftY = (zoomlocationY - currentvalues.ymin) * scaleFactorForTouch;
    newZYmin = zoomlocationY - leftY;
    rightY = (currentvalues.ymax - zoomlocationY) * scaleFactorForTouch;
    newZYmax = zoomlocationY + rightY;

    options = {};
    options.xmin = newZXmin;
    options.xmax = newZXmax;
    options.ymin = newZYmin;
    options.ymax = newZYmax;

    updateGraphZoom(gphname, options);

    // console.log(pinchStartMidpoint)
  }
}

function graphPinchEndEvent(event) {
  pinchZoom = false;
  window.removeEventListener("touchmove", graphPinchMoveEvent);
  window.removeEventListener("touchend", graphPinchEndEvent);
}

pinchZoom = false;
pinchStartData = [];

function graphDragMoveEvent(event) {
  event.preventDefault();
  gphname = currentMovingGraph.id;
  var rect = document.getElementById(gphname).getBoundingClientRect();
  posx = event.clientX - rect.left;
  posy = event.clientY - rect.top;
  svgPTVariable[gphname].x = event.clientX;
  svgPTVariable[gphname].y = event.clientY;

  touchEventDetect = 0;

  if (event.clientX == undefined) {
    posx = event.changedTouches[0].clientX - rect.left;
    posy = event.changedTouches[0].clientY - rect.top;
    svgPTVariable[gphname].x = event.changedTouches[0].clientX;
    svgPTVariable[gphname].y = event.changedTouches[0].clientY;

    if (event.changedTouches.length == 2) {
      oldtouch1 = [
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY,
      ];
      oldtouch2 = [
        event.changedTouches[1].clientX,
        event.changedTouches[1].clientY,
      ];
      pinchStartData = [oldtouch1, oldtouch2];
      dummyEve = {};
      pinchZoom = true;
      graphDragUpEvent(dummyEve);
      window.addEventListener("touchmove", graphPinchMoveEvent);
      window.addEventListener("touchend", graphPinchEndEvent);
    }

    touchEventDetect = event.changedTouches[0].identifier;
  }

  if (pinchZoom == false && touchEventDetect == 0) {
    var cursorpt = svgPTVariable[gphname].matrixTransform(
      document.getElementById(gphname).getScreenCTM().inverse()
    );

    moveX = svgToGraphX(
      cursorpt.x,
      graphData[gphname].xmin,
      graphData[gphname].xmax,
      graphData[gphname].aspectratio
    );
    moveY = svgToGraphY(
      cursorpt.y,
      graphData[gphname].ymin,
      graphData[gphname].ymax,
      graphData[gphname].aspectratio
    );

    deltaVecX = moveX - currentMovingGraphStartLocation[0];
    deltaVecY = moveY - currentMovingGraphStartLocation[1];
    currentvalues = graphData[gphname];

    newZXmin = currentvalues.xmin - deltaVecX;
    newZXmax = currentvalues.xmax - deltaVecX;
    newZYmin = currentvalues.ymin - deltaVecY;
    newZYmax = currentvalues.ymax - deltaVecY;

    if (typeof eval(graphData[gphname].dragIfCondition) != undefined) {
      if (eval(graphData[gphname].dragIfCondition) == true) {
        if (graphData[gphname].dragDirection == "bothXY") {
          options = {};
          options.xmin = newZXmin;
          options.xmax = newZXmax;
          options.ymin = newZYmin;
          options.ymax = newZYmax;
          updateGraphZoom(gphname, options);
          eval(graphData[gphname].runFunctionDuringDrag);
        } else if (graphData[gphname].dragDirection == "onlyY") {
          options = {};
          options.ymin = newZYmin;
          options.ymax = newZYmax;
          updateGraphZoom(gphname, options);
          eval(graphData[gphname].runFunctionDuringDrag);
        } else if (graphData[gphname].dragDirection == "onlyX") {
          options = {};
          options.xmin = newZXmin;
          options.xmax = newZXmax;
          updateGraphZoom(gphname, options);
          eval(graphData[gphname].runFunctionDuringDrag);
        }
      }
    }
  }
}

function graphDragUpEvent(event) {
  gphname = currentMovingGraph.id;

  currentMovingGraph.addEventListener("mousedown", graphDragHandle);
  currentMovingGraph.addEventListener("touchstart", graphDragHandle);
  window.removeEventListener("mousemove", graphDragMoveEvent);
  window.removeEventListener("mouseup", graphDragUpEvent);
  window.removeEventListener("touchmove", graphDragMoveEvent);
  window.removeEventListener("touchend", graphDragUpEvent);

  // window.removeEventListener('mouseout', pointUpEvent)
  eval(graphData[gphname].runFunctionOnDragEnd);

  currentMovingGraph.style.cursor = "auto";
}

function graphTouchDisable(event) {
  event.preventDefault();
}

dmode = "square";
if (
  1.25 * window.innerWidth < window.innerHeight &&
  window.innerWidth < window.innerHeight
) {
  dmode = "portrait";
} else if (
  window.innerWidth > 1.3 * window.innerHeight &&
  window.innerWidth > window.innerHeight
) {
  dmode = "landscape";
}

function setFont(divCollection, fontval) {
  for (divN = 0; divN < divCollection.length; divN++) {
    document.getElementById(divCollection[divN]).style.fontSize = fontval;
  }
}

function distF(pt1, pt2) {
  return Math.pow(
    Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2),
    0.5
  );
}

function addVec(pt1, pt2) {
  return [pt1[0] + pt2[0], pt1[1] + pt2[1]];
}

function directionvec(pt1, pt2) {
  diff = [pt2[0] - pt1[0], pt2[1] - pt1[1]];
  difflen = distF(diff, [0, 0]);
  return [diff[0] / difflen, diff[1] / difflen];
}

function mod(ofVector) {
  return distF(ofVector, [0, 0]);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function handleLayout1() {
  if (dmode == "landscape") {
    document.getElementById("mainVSpacer1").style.width = "2%";
    document.getElementById("MainBlock1").style.width = "48%";
    document.getElementById("mainVSpacer2").style.width = "5%";
    document.getElementById("MainBlock2").style.width = "43%";
    document.getElementById("mainVSpacer3").style.width = "2%";

    $("#plotGraphH").appendTo("#MainBlock1");
    $("#mainB2HSpacer5").appendTo("#MainBlock1");
    $("#parametersH").appendTo("#MainBlock1");
    $("#mainB2HSpacer6").appendTo("#MainBlock1");

    document.getElementById("mainB2HSpacer1").style.height = "3%";
    document.getElementById("maintitle").style.textAlign = "right";
    // document.getElementById('titleH').style.height = '15%'
    document.getElementById("maintitle").style.fontSize = "2vmax";

    document.getElementById("maintitle").innerHTML =
      "<font style='font-weight: bold;'>Epidemic Simulation </font><br/><font style='font-family: Source Sans Pro; font-size: 1.1vmax; vertical-align: bottom;'>An interactive inspired by 3Blue1Brown's <a href='https://www.youtube.com/watch?v=gxAaO2rsdIs' style='text-decoration: none; cursor: pointer;' target='_blank'><font style='color: hsla(197, 100%, 50%, 1);'>'Simulating an Epidemic' video</font></a><br/><font style='font-size: 0.9vmax'>Credits for the webapp visualization go to <a href='https://prajwalsouza.github.io/Experiments/Epidemic-Simulation.html' style='text-decoration: none; cursor: pointer;' target='_blank'><font style='color: hsla(280, 100%, 70%, 1);'>prajwalsouza.github.io</font></a></font></font>";

    document.getElementById("mainB2HSpacer2").style.height = "3%";
    document.getElementById("caseTypeNameH").style.height = "4%";
    document.getElementById("caseTypeNameH").style.fontSize = "1vmax";

    document.getElementById("upperLayer").style.height = "65%";
    document.getElementById("simpleCaseGraphH").style.height = "65%";
    // document.getElementById("centralLocationCaseGraphH").style.height = "65%";
    // document.getElementById("communitiesCaseGraphH").style.height = "65%";
    // document.getElementById("simpleCaseGraph&QH").style.height = "65%";
    // document.getElementById(
    //   "centralLocationQuarantineCaseGraphH"
    // ).style.height = "65%";
    // document.getElementById("communitiesQuarantineCaseGraphH").style.height =
    //   "65%";

    // document.getElementById("play-Info-QuarantineH").style.height = "4%";

    document.getElementById("playbutton").style.fontSize = "0.8vmax";
    document.getElementById("resetbutton").style.fontSize = "0.8vmax";

    document.getElementById("playButtonH").style.width = "12%";
    document.getElementById("resetButtonH").style.width = "12%";

    // document.getElementById("play-Info-QuarantineHSpacer1").style.width = "4%";

    document.getElementById("infoH").style.fontSize = "0.8vmax";
    document.getElementById("infoH").style.width = "100%";

    // document.getElementById("quarantineH").style.fontSize = "0.9vmax";
    // document.getElementById("quarantineH").style.float = "right";
    // document.getElementById("quarantineH").style.width = "25%";
    // document.getElementById("quarantineH").style.fontFamily = "Source Sans Pro";
    // document.getElementById("quarantinecheckLabel").style.fontSize = "0.9vmax";

    document.getElementById("mainB2HSpacer3").style.height = "3%";
    document.getElementById("caseTypeChooseH").style.height = "4%";

    document.getElementById("simpleCaseoption").style.fontSize = "0.86vmax";
    document.getElementById("centralLocationoption").style.fontSize =
      "0.86vmax";
    document.getElementById("communitiesoption").style.fontSize = "0.86vmax";

    // document.getElementById("simpleCaseoptionH").style.width = "14%";
    // document.getElementById("centralLocationoptionH").style.width = "27%";
    // document.getElementById("communitiesoptionH").style.width = "23%";

    // // $('#CommunitiesoptionH').insertBefore('#simpleCaseoptionH')
    // // $('#centralLocationoptionH').insertBefore('#simpleCaseoptionH')

    // $("#quarantineH").insertAfter("#communitiesoptionH");

    // document.getElementById('simpleCaseoptionH').style.float = 'right'
    // document.getElementById('centralLocationoptionH').style.float = 'right'
    // document.getElementById('CommunitiesoptionH').style.float = 'right'

    document.getElementById("plotGraphH").style.height = "40%";
    //document.getElementById("parametersH").style.height = "45%";

    // document.getElementById("parametersTitleText").style.fontSize = "1.1vmax";
    // document.getElementById("parametersTitleText").style.height = "10%";

    // document.getElementById("additionalPText").style.fontSize = "0.7vmax";

    // document.getElementById("parametersListH").style.fontSize = "0.96vmax";

    document.getElementById("mainB2HSpacer6").style.height = "1%";

    $("#infoH").insertAfter("#mainB2HSpacer6");

    document.getElementById("gradfillParameters").style.background =
      "linear-gradient(to bottom,hsla(0, 0%, 0%, 0), hsla(0, 100%, 100%, 0) 8%, hsla(0, 100%, 0%, 1) 10%, hsla(0, 100%, 100%, 0) 14%, hsla(0, 0%, 0%, 0) 88%,hsla(0, 100%, 0%, 1) 100%,hsla(0, 100%, 100%, 0) 100%,hsla(0, 100%, 100%, 0))";
  }
}

handleLayout1();

uid = 0;
graphData = {};

reverseGraphElementMap = {};

simulationParameters = {};

parameterData = {};

simulationParameters.reproductiveNumber = 0;

infectionStates = ["infected", "susceptible", "removed"];
stateColors = {
  infected: "10, 100%,70%",
  susceptible: "195, 100%, 50%",
  removed: "190, 0%, 40%",
  noSymptoms: "58, 100%, 50%",
};

loopcount = 0;
timecount = 0;
playing = true;

frameInterval = 0;
calculationFrameInterval = 0;

timeStepsPerDay = 24;
timeStep = 1 / timeStepsPerDay;

particleVicinityDB = {};
allParticleVicinityDB = {};
vicinityDelta = 0.1;

particleCounts = {};
particleCountTimeLine = {};

particleInfectionCount = {};

function addGraph(parentdiv, name, gdata) {
  gdata = gdata || {};

  gdata.name = name || "graph" + Math.random().toString();

  if (gdata.axislocationX != 0) {
    gdata.axislocationX = gdata.axislocationX || 0;
  } else {
    gdata.axislocationX = 0;
  }
  if (gdata.axislocationY != 0) {
    gdata.axislocationY = gdata.axislocationY || 0;
  } else {
    gdata.axislocationY = 0;
  }
  if (gdata.xmin != 0) {
    gdata.xmin = gdata.xmin || -1;
  } else {
    gdata.xmin = 0;
  }
  if (gdata.xmax != 0) {
    gdata.xmax = gdata.xmax || -1;
  } else {
    gdata.xmax = 0;
  }
  if (gdata.ymin != 0) {
    gdata.ymin = gdata.ymin || -1;
  } else {
    gdata.ymin = 0;
  }
  if (gdata.ymax != 0) {
    gdata.ymax = gdata.ymax || -1;
  } else {
    gdata.ymax = 0;
  }

  gdata.unitAspectRatio = gdata.unitAspectRatio || "no";
  gdata.fixAxis = gdata.fixAxis || "yaxis";
  gdata.fixAxisStretchCentrally = gdata.fixAxisStretchCentrally || "no";

  gdata.xaxisvisibility = gdata.xaxisvisibility || "yes";
  gdata.yaxisvisibility = gdata.yaxisvisibility || "yes";

  gdata.xaxislabelvisibility = gdata.xaxislabelvisibility || "yes";
  gdata.yaxislabelvisibility = gdata.yaxislabelvisibility || "yes";

  gdata.xmajorgridlinesvisibility = gdata.xmajorgridlinesvisibility || "yes";
  gdata.ymajorgridlinesvisibility = gdata.ymajorgridlinesvisibility || "yes";

  gdata.position = gdata.position || "absolute";

  var svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("viewBox", "0 0 100 100");
  // svgElement.setAttribute('preserveAspectRatio',"none")
  svgElement.setAttribute("id", name);
  svgElement.style.position = gdata.position;
  svgElement.style.left = "0%";
  svgElement.style.top = "0%";
  parentdiv.appendChild(svgElement);
  gdata.svgElement = svgElement;
  gdata.parentElement = parentdiv;

  gdata.fontSize = gdata.fontSize || 5;

  gdata.gridlinenumberX = gdata.gridlinenumberX || 10;
  gdata.gridlinenumberY = gdata.gridlinenumberY || 10;

  gdata.parentW = parentdiv.offsetWidth;
  gdata.parentH = parentdiv.offsetHeight;

  aratio = parentdiv.offsetWidth / parentdiv.offsetHeight;

  if (gdata.unitAspectRatio == "yes") {
    if (gdata.fixAxis == "yaxis") {
      if (gdata.fixAxisStretchCentrally == "yes") {
        centre = (gdata.xmax + gdata.xmin) / 2;
        gdata.xmin = centre - ((gdata.ymax - gdata.ymin) * aratio) / 2;
        gdata.xmax = centre + ((gdata.ymax - gdata.ymin) * aratio) / 2;
      } else {
        gdata.xmax = gdata.xmin + (gdata.ymax - gdata.ymin) * aratio;
      }
    } else {
      if (gdata.fixAxisStretchCentrally == "yes") {
        centre = (gdata.ymax + gdata.ymin) / 2;
        gdata.ymin = centre - ((gdata.xmax - gdata.xmin) * aratio) / 2;
        gdata.ymax = centre + ((gdata.xmax - gdata.xmin) * aratio) / 2;
      } else {
        gdata.ymax = gdata.ymin + (gdata.xmax - gdata.xmin) * aratio;
      }
    }
  }

  if (darkmode) {
    gdata.yaxiscolor = gdata.yaxiscolor || "hsla(0, 100%, 100%, 1)";
    gdata.xaxiscolor = gdata.xaxiscolor || "hsla(0, 100%, 100%, 1)";
    gdata.xmajorgridlabelcolor =
      gdata.xmajorgridlabelcolor || "hsla(0, 100%, 100%, 1)";
    gdata.ymajorgridlabelcolor =
      gdata.ymajorgridlabelcolor || "hsla(0, 100%, 100%, 1)";
    gdata.xmajorgridcolor = gdata.xmajorgridcolor || "hsla(0, 100%, 100%, 1)";
    gdata.ymajorgridcolor = gdata.ymajorgridcolor || "hsla(0, 100%, 100%, 1)";
  }

  gdata.yaxisthickness = gdata.yaxisthickness || 0.5;
  gdata.yaxiscolor = gdata.yaxiscolor || "hsla(0, 50%, 0%, 1)";

  if (gdata.yaxisvisibility == "yes") {
    var lineElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lineElement.setAttribute(
      "x1",
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y1",
      graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute("vector-effect", "non-scaling-stroke");
    lineElement.setAttribute(
      "x2",
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y2",
      graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute("id", gdata.name + "-yaxis");
    lineElement.style.stroke = gdata.yaxiscolor;
    lineElement.style.strokeWidth = gdata.yaxisthickness + "%";
    gdata.yaxisElement = lineElement;
    svgElement.appendChild(lineElement);
  }

  gdata.xaxisthickness = gdata.xaxisthickness || 0.5;
  gdata.xaxiscolor = gdata.xaxiscolor || "hsla(0, 50%, 0%, 1)";

  if (gdata.xaxisvisibility == "yes") {
    var lineElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lineElement.setAttribute(
      "x1",
      graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y1",
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute("vector-effect", "non-scaling-stroke");
    lineElement.setAttribute(
      "x2",
      graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + "%"
    );
    lineElement.setAttribute(
      "y2",
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + "%"
    );
    lineElement.setAttribute("id", gdata.name + "-xaxis");
    lineElement.style.stroke = gdata.xaxiscolor;
    lineElement.style.strokeWidth = gdata.xaxisthickness + "%";
    gdata.xaxisElement = lineElement;
    svgElement.appendChild(lineElement);
  }

  gdata.xmajorgridcolor = gdata.xmajorgridcolor || "hsla(190, 0%, 50%, 1)";
  gdata.xmajorgridthickness = gdata.xmajorgridthickness || 0.3;

  gdata.xmajorgridlinesextension = gdata.xmajorgridlinesextension || "yes";
  gdata.ymajorgridlinesextension = gdata.ymajorgridlinesextension || "yes";

  ticks = gdata.gridlinenumberX;

  if (gdata.xmajorgridlinesvisibility == "yes") {
    xmajortickvalues = gridtickvalues(gdata.xmin, gdata.xmax, ticks);
    gdata.xmajorgridElements = [];
    for (m = 0; m < xmajortickvalues.length; m++) {
      ticklocation = xmajortickvalues[m];
      var lineElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      ylength = gdata.ymax - gdata.ymin;
      if (gdata.xmajorgridlinesextension == "yes") {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(
            gdata.ymin - ylength / 2,
            gdata.ymin,
            gdata.ymax,
            aratio
          ) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(
            gdata.ymax + ylength / 2,
            gdata.ymin,
            gdata.ymax,
            aratio
          ) + "%"
        );
      } else {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("id", gdata.name + "-xmajorgridline-" + m);
      }
      lineElement.setAttribute("id", gdata.name + "-xmajorgridline-" + m);
      lineElement.style.stroke = gdata.xmajorgridcolor;
      lineElement.style.strokeWidth = gdata.xmajorgridthickness + "%";
      gdata.xmajorgridElements.push(lineElement);
      svgElement.appendChild(lineElement);
    }
    gdata.xmajorgridticks = xmajortickvalues;
  }

  gdata.ymajorgridcolor = gdata.ymajorgridcolor || "hsla(190, 0%, 50%, 1)";
  gdata.ymajorgridthickness = gdata.ymajorgridthickness || 0.3;

  ticks = gdata.gridlinenumberY;

  if (gdata.ymajorgridlinesvisibility == "yes") {
    ymajortickvalues = gridtickvalues(gdata.ymin, gdata.ymax, ticks);
    gdata.ymajorgridElements = [];
    for (m = 0; m < ymajortickvalues.length; m++) {
      ticklocation = ymajortickvalues[m];
      var lineElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      xlength = gdata.xmax - gdata.xmin;
      if (gdata.ymajorgridlinesextension == "yes") {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(
            gdata.xmin - xlength / 2,
            gdata.xmin,
            gdata.xmax,
            aratio
          ) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(
            gdata.xmax + xlength / 2,
            gdata.xmin,
            gdata.xmax,
            aratio
          ) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
      } else {
        lineElement.setAttribute(
          "x1",
          graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y1",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
        lineElement.setAttribute("vector-effect", "non-scaling-stroke");
        lineElement.setAttribute(
          "x2",
          graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + "%"
        );
        lineElement.setAttribute(
          "y2",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + "%"
        );
      }
      lineElement.setAttribute("id", gdata.name + "-ymajorgridline-" + m);
      lineElement.style.stroke = gdata.ymajorgridcolor;
      lineElement.style.strokeWidth = gdata.ymajorgridthickness + "%";
      gdata.ymajorgridElements.push(lineElement);
      svgElement.appendChild(lineElement);
    }
    gdata.ymajorgridticks = ymajortickvalues;
  }

  gdata.ymajorgridlabelvisibility = gdata.ymajorgridlabelvisibility || "yes";
  gdata.ymajorgridlabelcolor =
    gdata.ymajorgridlabelcolor || "hsla(190, 0%, 50%, 1)";

  gdata.ymajorgridlabelshift = gdata.ymajorgridlabelshift || 0.1;
  gdata.xmajorgridlabelshift = gdata.xmajorgridlabelshift || 0.1;

  gdata.xmajorgridlabelvisibility = gdata.xmajorgridlabelvisibility || "yes";
  gdata.xmajorgridlabelcolor =
    gdata.xmajorgridlabelcolor || "hsla(190, 0%, 50%, 1)";

  if (darkmode) {
    gdata.ymajorgridlabelcolor =
      gdata.ymajorgridlabelcolor || "hsla(190, 100%, 50%, 1)";
    gdata.xmajorgridlabelcolor =
      gdata.xmajorgridlabelcolor || "hsla(190, 100%, 50%, 1)";
  } else {
    gdata.ymajorgridlabelcolor =
      gdata.ymajorgridlabelcolor || "hsla(190, 0%, 50%, 1)";
    gdata.xmajorgridlabelcolor =
      gdata.xmajorgridlabelcolor || "hsla(190, 0%, 50%, 1)";
  }

  gdata.xlabelexclusionsstart = gdata.xlabelexclusionsstart || 0;
  gdata.xlabelexclusionsend = gdata.xlabelexclusionsend || 0;

  gdata.ylabelexclusionsstart = gdata.ylabelexclusionsstart || 0;
  gdata.ylabelexclusionsend = gdata.ylabelexclusionsend || 0;

  gdata.isComplexPlane = gdata.isComplexPlane || "no";

  gdata.ymajorgridlabelOnlyIf = gdata.ymajorgridlabelOnlyIf || "true";

  if (gdata.ymajorgridlabelvisibility == "yes") {
    gdata.ymajorlabelsElements = [];
    ymajortickvalues = gridtickvalues(gdata.ymin, gdata.ymax, ticks);
    labelylocationX = gdata.axislocationX;
    if (
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) < 0
    ) {
      labelylocationX = gdata.xmin;
    }
    if (
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) > 100
    ) {
      labelylocationX = gdata.xmax;
    }
    for (
      m = gdata.ylabelexclusionsstart;
      m < ymajortickvalues.length - gdata.ylabelexclusionsend;
      m++
    ) {
      ticklocation = ymajortickvalues[m];
      value = ticklocation;
      if (eval(gdata.ymajorgridlabelOnlyIf)) {
        var textElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        if (isInt(ticklocation)) {
          if (gdata.isComplexPlane == "yes") {
            textElement.innerHTML = ticklocation + "i";
          }
        } else {
          expstring = ticklocation.toExponential().toString();
          order = expstring.slice(expstring.indexOf("e") + 1) * -1;
          if (parseFloat(order) < -1) {
            ticklocation = ticklocation.toExponential(0);
          } else {
            ticklocation = ticklocation.toFixed(2);
          }
          textElement.innerHTML = ticklocation;
          if (ticklocation == 0) {
            textElement.innerHTML = 0;
          }
          if (gdata.isComplexPlane == "yes") {
            textElement.innerHTML = ticklocation + "i";
          }
        }

        textElement.setAttribute(
          "x",
          graphToScaledX(labelylocationX, gdata.xmin, gdata.xmax, aratio) +
            0.5 +
            gdata.ymajorgridlabelshift +
            "%"
        );
        textElement.setAttribute(
          "y",
          graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) +
            0.5 +
            "%"
        );
        textElement.setAttribute("id", gdata.name + "-yticklabel-" + m);
        textElement.style.fontSize = gdata.fontSize;
        textElement.style.userSelect = "none";
        textElement.style.fontFamily = "Source Sans Pro";
        textElement.style.fill = gdata.ymajorgridlabelcolor;
        svgElement.appendChild(textElement);
        gdata.ymajorlabelsElements.push(textElement);
      }
    }
  }

  ticks = gdata.gridlinenumberX;

  gdata.xmajorgridlabelOnlyIf = gdata.xmajorgridlabelOnlyIf || "true";

  if (gdata.xmajorgridlabelvisibility == "yes") {
    gdata.xmajorlabelsElements = [];
    xmajortickvalues = gridtickvalues(gdata.xmin, gdata.xmax, ticks);
    labelxlocationY = gdata.axislocationY;
    if (
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) < 0
    ) {
      labelxlocationY = gdata.ymin;
    }
    if (
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) > 100
    ) {
      labelxlocationY = gdata.ymax;
    }

    for (
      m = gdata.xlabelexclusionsstart;
      m < xmajortickvalues.length - gdata.xlabelexclusionsend;
      m++
    ) {
      ticklocation = xmajortickvalues[m];
      value = ticklocation;
      if (eval(gdata.xmajorgridlabelOnlyIf)) {
        var textElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        if (isInt(ticklocation)) {
          textElement.innerHTML = ticklocation;
        } else {
          expstring = ticklocation.toExponential().toString();
          order = expstring.slice(expstring.indexOf("e") + 1) * -1;
          if (parseFloat(order) < -1) {
            ticklocation = ticklocation.toExponential(0);
          } else {
            ticklocation = ticklocation.toFixed(2);
          }
          textElement.innerHTML = ticklocation;
          if (ticklocation == 0) {
            textElement.innerHTML = 0;
          }
        }

        textElement.setAttribute(
          "x",
          graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) - 1 + "%"
        );
        textElement.setAttribute(
          "y",
          graphToScaledY(labelxlocationY, gdata.ymin, gdata.ymax, aratio) +
            2 +
            gdata.xmajorgridlabelshift +
            "%"
        );
        textElement.setAttribute("id", gdata.name + "-xticklabel-" + m);
        textElement.style.fontSize = gdata.fontSize;
        textElement.style.fontFamily = "Source Sans Pro";
        textElement.style.userSelect = "none";
        textElement.style.fill = gdata.xmajorgridlabelcolor;

        svgElement.appendChild(textElement);

        gdata.xmajorlabelsElements.push(textElement);
      }
    }
  }

  gdata.xaxislabel = gdata.xaxislabel || "x axis";
  gdata.yaxislabel = gdata.yaxislabel || "y axis";

  gdata.xaxislabelshift = gdata.xaxislabelshift || 2;
  gdata.yaxislabelshift = gdata.yaxislabelshift || 2;

  if (darkmode) {
    gdata.yaxislabelcolor = gdata.yaxislabelcolor || "hsla(190, 100%, 100%, 1)";
    gdata.xaxislabelcolor = gdata.xaxislabelcolor || "hsla(190, 100%, 100%, 1)";
  } else {
    gdata.yaxislabelcolor = gdata.yaxislabelcolor || "hsla(190, 0%, 0%, 1)";
    gdata.xaxislabelcolor = gdata.xaxislabelcolor || "hsla(190, 0%, 0%, 1)";
  }

  if (gdata.xaxislabelvisibility == "yes") {
    var textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textElement.innerHTML = gdata.xaxislabel;
    textElement.setAttribute(
      "x",
      graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) +
        gdata.xaxislabelshift +
        "%"
    );
    textElement.setAttribute(
      "y",
      graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) +
        1 +
        "%"
    );
    textElement.setAttribute("id", name + "-xaxislabel");
    textElement.style.fontSize = gdata.fontSize;
    textElement.style.color = gdata.xaxislabelcolor;
    textElement.style.fontFamily = "Source Sans Pro";

    svgElement.appendChild(textElement);
    gdata.xaxislabelElement = textElement;
  }

  if (gdata.yaxislabelvisibility == "yes") {
    var textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textElement.innerHTML = gdata.yaxislabel;
    textElement.setAttribute(
      "x",
      graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) +
        0 +
        "%"
    );
    textElement.setAttribute(
      "y",
      graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) -
        gdata.yaxislabelshift +
        "%"
    );
    textElement.setAttribute("id", name + "-yaxislabel");
    textElement.style.fontSize = gdata.fontSize;
    textElement.style.color = gdata.yaxislabelcolor;
    textElement.style.fontFamily = "Source Sans Pro";

    svgElement.appendChild(textElement);
    gdata.yaxislabelElement = textElement;
  }

  gdata.scrollZoom = gdata.scrollZoom || "yes";

  if (gdata.scrollZoom == "yes") {
    svgElement.addEventListener("wheel", wheelHandle);
  }

  svgPTVariable[name] = svgElement.createSVGPoint();

  gdata.draggability = gdata.draggability || "no";
  if (gdata.draggability == "yes") {
    gdata.currentlyDraggableGraph = gdata.currentlyDraggableGraph || "yes";
  } else {
    gdata.currentlyDraggableGraph = gdata.currentlyDraggableGraph || "no";
  }
  gdata.runFunctionOnDragEnd = gdata.runFunctionOnDragEnd || "";
  gdata.runFunctionDuringDrag = gdata.runFunctionDuringDrag || "";

  if (gdata.draggability == "yes") {
    svgElement.addEventListener("mousedown", graphDragHandle);
    svgElement.addEventListener("touchstart", graphDragHandle);
  } else {
    svgElement.addEventListener("touchmove", graphTouchDisable);
  }

  if (gdata.draggability != "yes" && gdata.scrollZoom != "yes") {
    svgElement.style.pointerEvents = "none";
  }

  gdata.dragDirection = gdata.dragDirection || "bothXY";
  gdata.dragIfCondition = gdata.dragIfCondition || "true";

  gdata.lineData = {};
  gdata.circleData = {};
  gdata.pointData = {};
  gdata.ellipseData = {};
  gdata.rectData = {};
  gdata.textData = {};
  gdata.pathData = {};
  gdata.sliderData = {};

  gdata.aspectratio = aratio;

  graphData[name] = gdata;
  return JSON.parse(JSON.stringify(gdata));
}

function setUpPlotGraph() {
  graphH = document.getElementById("plotGraphH");
  graphoptions = {};
  graphoptions.xmax = 10 + 10 * 0.3;
  graphoptions.xmin = -0.1;

  graphoptions.ymax = 120;
  graphoptions.ymin = -30;

  graphoptions.axislocationX = 0;
  graphoptions.axislocationY = 0;

  // graphoptions.xaxislabelvisibility = 'no'
  graphoptions.yaxislabelvisibility = "no";

  graphoptions.xaxisvisibility = "no";
  graphoptions.yaxisvisibility = "no";

  // graphoptions.xmajorgridlabelvisibility = 'no'
  // graphoptions.ymajorgridlabelvisibility = 'no'

  graphoptions.xmajorgridlabelOnlyIf = "value >= 0 && value <= 10";
  graphoptions.ymajorgridlabelOnlyIf =
    "value >= 0 && value <= 100 && value % 20 != 10";

  graphoptions.xmajorgridlinesvisibility = "no";
  graphoptions.ymajorgridlinesvisibility = "no";

  graphoptions.ymajorgridlabelcolor = "hsla(190, 0%, 100%, 1)";

  // graphoptions.ymajorgridlinesextension = 'yes'
  // graphoptions.xmajorgridlinesextension = 'yes'

  // graphoptions.xaxislabel = 'Time'
  // graphoptions.yaxislabel = 'M'

  graphoptions.gridlinenumberX = 5;
  graphoptions.gridlinenumberY = 10;

  graphoptions.fontSize = "0.67vmax";

  graphoptions.xmajorgridlabelshift = 6;
  graphoptions.ymajorgridlabelshift = -12;

  graphoptions.yaxisthickness = 2;
  graphoptions.xaxisthickness = 2;

  fontForLineLabel = "0.8vmax";

  graphoptions.draggability = "no";

  if (dmode == "landscape") {
    graphoptions.fontSize = "0.24vmax";
    graphoptions.xmajorgridlabelshift = 4;
    graphoptions.ymajorgridlabelshift = -9;
    fontForLineLabel = "0.28vmax";
    graphoptions.draggability = "yes";
  }

  // if (mode == 'portrait') {
  // 	graphoptions.gridlinenumberX = 4
  // 	graphoptions.gridlinenumberY = 11
  // 	graphoptions.fontSize = 5
  // }

  // graphoptions.unitAspectRatio = 'yes'
  // graphoptions.fixAxis = 'xaxis'
  // graphoptions.fixAxisStretchCentrally = 'yes'

  // graphoptions.position = 'relative'
  graphoptions.scrollZoom = "yes";

  // graphoptions.isgraphH = 'yes'

  addGraph(graphH, "plotG", graphoptions);

  options = {};
  options.x1 = 0;
  options.y1 = 0;
  options.x2 = 10;
  options.y2 = 0;
  options.linecolor = "hsla(0, 0%, 70%, 1)";
  options.strokewidth = 1;

  addLine("plotG", "xAxisLine", options);

  options = {};
  options.x1 = 0;
  options.y1 = 0;
  options.x2 = 0;
  options.y2 = 100;
  options.linecolor = "hsla(0, 0%, 70%, 1)";
  options.strokewidth = 1;

  addLine("plotG", "yAxisLine", options);

  options = {};
  options.points = [
    [0, 0],
    [0, 0],
  ];
  options.pathcolor = "hsla(" + stateColors["removed"] + ",0)";
  removedLinePath = addPath("plotG", "removedLine", options)[0];
  removedLinePath.style.fill = "hsla(" + stateColors["removed"] + ",1)";

  options = {};
  options.x = 10 * 1.03;
  options.y = 80;
  options.text = "1% Removed";
  options.fontSize = fontForLineLabel;
  options.textcolor = "hsla(190, 0%, 70%, 1)";
  addText("plotG", "removedText", options);

  options = {};
  options.points = [
    [0, 0],
    [0, 0],
  ];
  options.pathcolor = "hsla(" + stateColors["susceptible"] + ",0)";
  susceptibleLinePath = addPath("plotG", "susceptibleLine", options)[0];
  susceptibleLinePath.style.fill = "hsla(" + stateColors["susceptible"] + ",1)";

  options = {};
  options.x = 10 * 1.03;
  options.y = 50;
  options.text = "1% Susceptible";
  options.fontSize = fontForLineLabel;
  options.textcolor = "hsla(" + stateColors["susceptible"] + ",1)";
  addText("plotG", "susceptibleText", options);

  options = {};
  options.points = [
    [0, 0],
    [0, 0],
  ];
  options.pathcolor = "hsla(" + stateColors["infected"] + ",0)";
  infectedLinePath = addPath("plotG", "infectedLine", options)[0];
  infectedLinePath.style.fill = "hsla(" + stateColors["infected"] + ",1)";

  options = {};
  options.x = 10 * 1.03;
  options.y = 20;
  options.text = "1% Infected";
  options.fontSize = fontForLineLabel;
  options.textcolor = "hsla(" + stateColors["infected"] + ",1)";
  addText("plotG", "infectedText", options);
}

setUpPlotGraph();

simpleCaseBoundaryRanges = [-1, 1, -1, 1];
boundaryData = {};

function drawBoundary(graphN, boundaryN, boundaryRanges, boundaryProp) {
  boundaryData[boundaryN] = {};
  boundaryData[boundaryN]["range"] = boundaryRanges;
  boundaryData[boundaryN]["center"] = [
    (boundaryRanges[0] + boundaryRanges[1]) / 2,
    (boundaryRanges[2] + boundaryRanges[3]) / 2,
  ];
  boundaryData[boundaryN]["graph"] = graphN;

  particleData[boundaryN] = {};

  options = {};
  options.points = [
    [boundaryRanges[1], boundaryRanges[3]],
    [boundaryRanges[0], boundaryRanges[3]],
    [boundaryRanges[0], boundaryRanges[2]],
    [boundaryRanges[1], boundaryRanges[2]],
    [boundaryRanges[1], boundaryRanges[3]],
  ];
  options.pathcolor = boundaryProp.color;
  options.strokewidth = 0.4;
  addPath(graphN, boundaryN, options);

  //createVicinityDB(boundaryN);
}

particleData = {};
// particleID = 1;

initialParticleV = 0.2;
speedLimit = 0.1;
accLimit = 0.01;

boundaryForceC = 0.1;
randomSmallJerk = 0.001;

function updateCsvPosState(boundaryN, graphN, statuses, pos_x, pos_y) {
  // Check to see if the counter has been initialized
  if (typeof updateCsvPosState.counter == "undefined") {
    // It has not... perform the initialization
    updateCsvPosState.counter = 1;
  }
  particleCounts[graphN]["susceptible"] = 0;
  particleCounts[graphN]["infected"] = 0;
  particleCounts[graphN]["removed"] = 0;

  var totalparticles = statuses.length;

  for (particleID = 1; particleID < statuses.length + 1; particleID++) {
    options = {};
    options.pointsize = simulationParameters.particleSize;

    if (updateCsvPosState.counter === 1) {
      particleData[boundaryN][particleID] = {};
      particleInfectionCount[graphN][particleID] = {};
    }
    particleInfectionCount[graphN][particleID].infectionC = 0;

    particleData[boundaryN][particleID].socialDistancingObedience = 1;

    particleData[boundaryN][particleID].vx =
      2 * (Math.random() - 0.5) * initialParticleV;
    particleData[boundaryN][particleID].vy =
      2 * (Math.random() - 0.5) * initialParticleV;

    particleData[boundaryN][particleID].ax = 0;
    particleData[boundaryN][particleID].ay = 0;

    particleData[boundaryN][particleID].x = pos_x[particleID - 1]; ////bdexclusionSX * bdexclusionRX+ bdexclusionSX + (Math.random())
    particleData[boundaryN][particleID].y = pos_y[particleID - 1]; //bdexclusionSY + * bdexclusionRY
    var state_str = "";
    switch (statuses[particleID - 1]) {
      case 0:
        state_str = "susceptible";
        particleCounts[graphN]["susceptible"] =
          particleCounts[graphN]["susceptible"] + 1;
        break;
      case 1:
        state_str = "infected";
        particleCounts[graphN]["infected"] =
          particleCounts[graphN]["infected"] + 1;
        break;
      case 2:
        state_str = "removed";
        particleCounts[graphN]["removed"] =
          particleCounts[graphN]["removed"] + 1;
        break;
    }
    particleData[boundaryN][particleID].state = state_str;

    // if (particleIndex < parseInt(totalparticles*initiallyInfectedN)) {

    // 	particleData[boundaryN][particleID].state = 'infected'
    // 	particleCounts[graphN]['infected'] = particleCounts[graphN]['infected'] + 1

    // }
    // else {
    // 	particleData[boundaryN][particleID].state = 'susceptible'
    // 	particleCounts[graphN]['susceptible'] = particleCounts[graphN]['susceptible'] + 1
    // }

    particleData[boundaryN][particleID].infectionAnimation = false;
    particleData[boundaryN][particleID].infectionAnimationFrame = 0;
    particleData[boundaryN][particleID].daysSinceInfection = 0;

    particleData[boundaryN][particleID].quarantined = false;
    particleData[boundaryN][particleID].showsSymptoms = true;

    particleData[boundaryN][particleID].visitingCentralLocation = false;
    particleData[boundaryN][particleID].visitingCLFrame = 0;

    particleData[boundaryN][particleID].color =
      stateColors[particleData[boundaryN][particleID].state];
    if (
      Math.random() < simulationParameters.probabilityOfNoSymptoms &&
      particleData[boundaryN][particleID].state == "infected"
    ) {
      particleData[boundaryN][particleID].showsSymptoms = false;
      particleData[boundaryN][particleID].color = stateColors["noSymptoms"];
    }

    // init part
    if (updateCsvPosState.counter === 1) {
      particleData[boundaryN][particleID].moveAnimation = false;
      particleData[boundaryN][particleID].moveAnimationFrame = 1;
      particleData[boundaryN][particleID].moveAnimationFrom = [
        particleData[boundaryN][particleID].x,
        particleData[boundaryN][particleID].y,
      ];
      particleData[boundaryN][particleID].moveAnimationTo =
        boundaryData[boundaryN]["center"];
      particleData[boundaryN][particleID].moveAnimationTime =
        timeStepsPerDay / 2;
      options.x = particleData[boundaryN][particleID].x;
      options.y = particleData[boundaryN][particleID].y;
      options.pointcolor =
        "hsla(" + particleData[boundaryN][particleID].color + ",1)";
      addPoint(graphN, "particle@" + particleID, options);

      options = {};
      options.circlecolor = "hsla(190, 0%, 0%, 0)";
      options.stroke =
        "hsla(" + particleData[boundaryN][particleID].color + ",0)";
      options.x = particleData[boundaryN][particleID].x;
      options.y = particleData[boundaryN][particleID].y;
      options.radius = 0;
      options.strokewidth = 2;
      addCircle(graphN, "particleCircle@" + particleID, options);
      //particleID = particleID + 1
    }
  }
  updateCsvPosState.counter += 1;
}

function readCsv(timestep, graphN, boundaryN) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      crossDomain: true,
      url: address + ":" + csv_port + `/data_${timestep}.csv`, // `http://localhost:8080/data_${timestep}.csv`,

      dataType: "text",

      success: function (data) {
        processData(data);
      },
    });
  });

  function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);

    var headers = allTextLines[0].split(",");

    var lines = [];
    var statuses = [];
    var pos_x = [];
    var pos_y = [];

    for (var i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(",");

      if (data.length == headers.length) {
        var tarr = [];

        for (var j = 0; j < headers.length; j++) {
          tarr.push(headers[j] + ":" + data[j]);
        }

        statuses.push(parseInt(data[0]));
        pos_x.push(parseFloat(data[1]));
        pos_y.push(parseFloat(data[2]));
        lines.push(tarr);
      }
    }
    updateCsvPosState(boundaryN, graphN, statuses, pos_x, pos_y);
  }
}

function addParticlesToBoundary(graphN, boundaryN, particleN) {
  boundaryData[boundaryN]["particleNumber"] = particleN;
  totalparticles = boundaryData[boundaryN]["particleNumber"];
  initiallyInfectedN = boundaryData[boundaryN]["fractionInfectedInitially"];

  bdrange = boundaryData[boundaryN]["range"];
  bdexclusionWX = (bdrange[1] - bdrange[0]) / 20;
  bdexclusionRX = bdrange[1] - bdrange[0] - 2 * bdexclusionWX;
  bdexclusionSX = bdrange[0] + bdexclusionWX;

  bdexclusionWY = (bdrange[3] - bdrange[2]) / 20;
  bdexclusionRY = bdrange[3] - bdrange[2] - 2 * bdexclusionWY;
  bdexclusionSY = bdrange[2] + bdexclusionWY;

  readCsv(1, graphN, boundaryN);
}

function removeParticlesFromBoundary(graphN, boundaryN) {
  totalparticles = boundaryData[boundaryN]["particleNumber"];
  for (var partID in particleData[boundaryN]) {
    delete particleData[boundaryN][partID];
    particleCounts[graphN]["infected"] = 0;
    particleCounts[graphN]["susceptible"] = 0;
    particleCounts[graphN]["removed"] = 0;

    delete particleInfectionCount[graphN][partID];

    removePoint(graphN, "particle@" + partID, options);
    removeCircle(graphN, "particleCircle@" + partID);
  }
}

function setUpSimpleCaseGraph() {
  graphH = document.getElementById("simpleCaseGraphH");
  graphoptions = {};
  graphoptions.xmax = 1;
  graphoptions.xmin = -1;

  graphoptions.ymax = 1;
  graphoptions.ymin = -1;

  graphoptions.axislocationX = 0;
  graphoptions.axislocationY = 0;

  graphoptions.xaxislabelvisibility = "no";
  graphoptions.yaxislabelvisibility = "no";

  graphoptions.xaxisvisibility = "no";
  graphoptions.yaxisvisibility = "no";

  graphoptions.xmajorgridlabelvisibility = "no";
  graphoptions.ymajorgridlabelvisibility = "no";

  graphoptions.xmajorgridlinesvisibility = "no";
  graphoptions.ymajorgridlinesvisibility = "no";

  graphoptions.fontSize = 1.6;

  graphoptions.unitAspectRatio = "yes";
  graphoptions.fixAxisStretchCentrally = "yes";

  graphoptions.scrollZoom = "yes";
  graphoptions.draggability = "yes";

  addGraph(graphH, "simpleCaseGraphG", graphoptions);

  boundaryProperties = {};
  boundaryProperties.color = "white";
  drawBoundary(
    "simpleCaseGraphG",
    "simpleCaseGraphB",
    simpleCaseBoundaryRanges,
    boundaryProperties
  );

  boundaryData["simpleCaseGraphB"]["fractionInfectedInitially"] =
    simulationParameters.fractionInfectedInitially;

  particleCounts["simpleCaseGraphG"] = {};
  particleCounts["simpleCaseGraphG"]["infected"] = 0;
  particleCounts["simpleCaseGraphG"]["susceptible"] = 0;
  particleCounts["simpleCaseGraphG"]["removed"] = 0;

  particleCountTimeLine["simpleCaseGraphG"] = {};
  particleCountTimeLine["simpleCaseGraphG"]["infected"] = [];
  particleCountTimeLine["simpleCaseGraphG"]["susceptible"] = [];
  particleCountTimeLine["simpleCaseGraphG"]["removed"] = [];

  particleInfectionCount["simpleCaseGraphG"] = {};

  addParticlesToBoundary(
    "simpleCaseGraphG",
    "simpleCaseGraphB",
    simulationParameters.numberOfParticles
  );
  //createVicinityDB('simpleCaseGraphB')
  //prepInteractionData('simpleCaseGraphB')
}

setUpSimpleCaseGraph();
currentSim = "simpleCase";
currentSimG = "simpleCaseGraphG";

visitCLAndReturnDuration = timeStepsPerDay * 2;
fractionOfDurationToReachCL = 0.3;
returnToCLFactor = 1 - fractionOfDurationToReachCL;

function moveParticles(ofBoundary) {
  const graphN = "simpleCaseGraphG";
  partDB = particleData[ofBoundary];
  for (var particleIndex in partDB) {
    // partDB[particleIndex].x = 0//linearValue(0, moveTime, moveFrom[0], moveTo[0], particleData[ofBoundary][particleIndex].moveAnimationFrame)
    // partDB[particleIndex].y = 0
    particleData[ofBoundary][particleIndex].moveAnimationFrame =
      particleData[ofBoundary][particleIndex].moveAnimationFrame + 1;
    // if (partDB[particleIndex].moveAnimation) {
    // 	moveFrom = partDB[particleIndex].moveAnimationFrom
    // 	moveTo = partDB[particleIndex].moveAnimationTo
    // 	moveTime = partDB[particleIndex].moveAnimationTime
    // 	particleData[ofBoundary][particleIndex].moveAnimationFrame = particleData[ofBoundary][particleIndex].moveAnimationFrame + 1
    // 	partDB[particleIndex].x = 0//linearValue(0, moveTime, moveFrom[0], moveTo[0], particleData[ofBoundary][particleIndex].moveAnimationFrame)
    // 	partDB[particleIndex].y = 0//linearValue(0, moveTime, moveFrom[1], moveTo[1], particleData[ofBoundary][particleIndex].moveAnimationFrame)

    // 	if (particleData[ofBoundary][particleIndex].moveAnimationFrame >= moveTime) {
    // 		particleData[ofBoundary][particleIndex].moveAnimation = false
    // 		particleData[ofBoundary][particleIndex].moveAnimationFrame = 0
    // 	}
    // }
  }
  const timestep = particleData[ofBoundary][1].moveAnimationFrame;
  readCsv(timestep, graphN, ofBoundary);
  // 		// 	else if (partDB[particleIndex].visitingCentralLocation) {
  // 		// 		partDB[particleIndex].visitingCLFrame = partDB[particleIndex].visitingCLFrame + 1
  // 		// 		if (partDB[particleIndex].visitingCLFrame < visitCLAndReturnDuration*fractionOfDurationToReachCL) {
  // 		// 			partDB[particleIndex].x = linearValue(0, visitCLAndReturnDuration*fractionOfDurationToReachCL, partDB[particleIndex].visitingCLFrom[0], boundaryData[ofBoundary]['center'][0], partDB[particleIndex].visitingCLFrame)
  // 		// 			partDB[particleIndex].y = linearValue(0, visitCLAndReturnDuration*fractionOfDurationToReachCL, partDB[particleIndex].visitingCLFrom[1], boundaryData[ofBoundary]['center'][1], partDB[particleIndex].visitingCLFrame)
  // 		// 		}
  // 		// 		else if(partDB[particleIndex].visitingCLFrame > visitCLAndReturnDuration*returnToCLFactor) {
  // 		// 			partDB[particleIndex].x = linearValue(visitCLAndReturnDuration*fractionOfDurationToReachCL, visitCLAndReturnDuration, boundaryData[ofBoundary]['center'][0], partDB[particleIndex].visitingCLFrom[0], partDB[particleIndex].visitingCLFrame)
  // 		// 			partDB[particleIndex].y = linearValue(visitCLAndReturnDuration*fractionOfDurationToReachCL, visitCLAndReturnDuration, boundaryData[ofBoundary]['center'][1], partDB[particleIndex].visitingCLFrom[1], partDB[particleIndex].visitingCLFrame)
  // 		// 		}

  // 		// 		if (partDB[particleIndex].visitingCLFrame >= visitCLAndReturnDuration) {
  // 		// 			partDB[particleIndex].visitingCentralLocation = false
  // 		// 			partDB[particleIndex].visitingCLFrame = 0
  // 		// 		}

  // 		// 	}
  // 			else {
  // 				// read new position
  // 				partDB[particleIndex].x = 0//partDB[particleIndex].x + (partDB[particleIndex].vx*timeStep)
  // 				partDB[particleIndex].y = 0//partDB[particleIndex].y + (partDB[particleIndex].vy*timeStep)

  // 				if (ofBoundary == 'simpleQuarantineB') {
  // 					boundaryRForce = boundaryRepulsiveForce([partDB[particleIndex].x, partDB[particleIndex].y], ofBoundary, boundaryForceC*3, 0.07)
  // 				}
  // 				else {
  // 					boundaryRForce = boundaryRepulsiveForce([partDB[particleIndex].x, partDB[particleIndex].y], ofBoundary, boundaryForceC, 0.1)
  // 				}
  // 	}
  // }

  // 		// A SocialDistancingRepulsiveForce

  // 		if (simulationParameters.socialDistancingFactorA > 0 && particleData[ofBoundary][particleIndex].socialDistancingObedience != 0) {
  // 			mainParticlePos = [particleData[ofBoundary][particleIndex].x, particleData[ofBoundary][particleIndex].y]
  // 			vicinityN = getParticleVicinityN(mainParticlePos, ofBoundary)
  // 			particlesClose = getSurroundingRepulsives(vicinityN, ofBoundary)

  // 			totalForce = [0, 0]
  // 			for (vPIndex = 0; vPIndex < particlesClose.length; vPIndex++) {
  // 				vicinityParticle = particlesClose[vPIndex]
  // 				if (vicinityParticle != particleIndex && particleData[ofBoundary][vicinityParticle] != undefined) {
  // 					vicinityParticlePos = [particleData[ofBoundary][vicinityParticle].x, particleData[ofBoundary][vicinityParticle].y]
  // 					distanceR = distF(mainParticlePos, vicinityParticlePos)
  // 					unitVec = directionvec(vicinityParticlePos,mainParticlePos)
  // 					distanceInverse = 1/Math.pow(distanceR, 3)

  // 					obedience = particleData[ofBoundary][particleIndex].socialDistancingObedience
  // 					socialDistancingForceFactor = simulationParameters.socialDistancingFactorA
  // 					smallF = [unitVec[0]*distanceInverse*socialDistancingForceFactor*obedience, unitVec[1]*distanceInverse*socialDistancingForceFactor*obedience]
  // 					totalForce = addVec(totalForce, smallF)
  // 				}

  // 			}
  // 			partDB[particleIndex].ax = partDB[particleIndex].ax + (totalForce[0]/100)
  // 			partDB[particleIndex].ay = partDB[particleIndex].ay + (totalForce[1]/100)

  // 			speedLimitForSD = linearValue(0,1, 0.1, 0.05,simulationParameters.socialDistancingFactorA)

  // 			pspeed = mod([partDB[particleIndex].vx, partDB[particleIndex].vy])
  // 			if (pspeed > speedLimitForSD) {
  // 				partDB[particleIndex].vx = partDB[particleIndex].vx*speedLimitForSD/pspeed
  // 				partDB[particleIndex].vy = partDB[particleIndex].vy*speedLimitForSD/pspeed
  // 			}
  // 			accLimitForSD = linearValue(0, 1, 0.01, 0.1,simulationParameters.socialDistancingFactorA)

  // 			modAcc = mod([partDB[particleIndex].ax, partDB[particleIndex].ay])
  // 			if (modAcc > accLimitForSD) {
  // 				partDB[particleIndex].ax = partDB[particleIndex].ax*accLimitForSD/modAcc
  // 				partDB[particleIndex].ay = partDB[particleIndex].ay*accLimitForSD/modAcc
  // 			}
  // 		}
  // 		else {
  // 			partDB[particleIndex].ax = partDB[particleIndex].ax + 2*(Math.random() - 0.5)*randomSmallJerk
  // 			partDB[particleIndex].ay = partDB[particleIndex].ay + 2*(Math.random() - 0.5)*randomSmallJerk

  // 			pspeed = mod([partDB[particleIndex].vx, partDB[particleIndex].vy])
  // 			if (pspeed > speedLimit) {
  // 				partDB[particleIndex].vx = partDB[particleIndex].vx*speedLimit/pspeed
  // 				partDB[particleIndex].vy = partDB[particleIndex].vy*speedLimit/pspeed
  // 			}

  // 			modAcc = mod([partDB[particleIndex].ax, partDB[particleIndex].ay])
  // 			if (modAcc > accLimit) {
  // 				partDB[particleIndex].ax = partDB[particleIndex].ax*accLimit/modAcc
  // 				partDB[particleIndex].ay = partDB[particleIndex].ay*accLimit/modAcc
  // 			}
  // 		}

  // 		partDB[particleIndex].vx = partDB[particleIndex].vx + (partDB[particleIndex].ax*timeStep) + (boundaryRForce[0]*timeStep)
  // 		partDB[particleIndex].vy = partDB[particleIndex].vy + (partDB[particleIndex].ay*timeStep) + (boundaryRForce[1]*timeStep)
  // 	}

  // 	if ((currentSim == 'centralLocationCase' || currentSim == 'centralLocationQuarantineCase') && particleData[ofBoundary][particleIndex].moveAnimation == false && Math.random() < simulationParameters.probabilityCLVisit && particleData[ofBoundary][particleIndex].visitingCentralLocation == false) {
  // 		particleData[ofBoundary][particleIndex].visitingCentralLocation = true
  // 		particleData[ofBoundary][particleIndex].visitingCLFrame = 0
  // 		particleData[ofBoundary][particleIndex].visitingCLFrom = [particleData[ofBoundary][particleIndex].x, particleData[ofBoundary][particleIndex].y]
  // 	}
  // }
}

function animateParticles(ofBoundary) {
  partDB = particleData[ofBoundary];
  for (var particleIndex in partDB) {
    options = {};
    updatePointXY(
      boundaryData[ofBoundary]["graph"],
      "particle@" + particleIndex,
      partDB[particleIndex].x,
      partDB[particleIndex].y
    );

    if (particleData[ofBoundary][particleIndex].infectionAnimation) {
      particleData[ofBoundary][particleIndex].infectionAnimationFrame =
        particleData[ofBoundary][particleIndex].infectionAnimationFrame +
        (100 * simulationParameters.daysEverySecond) /
          (6 * simulationParameters.frameRate);
      cinfectradius = linearValue(
        0,
        100,
        0,
        simulationParameters.infectionRadius,
        particleData[ofBoundary][particleIndex].infectionAnimationFrame
      );
      cinfectradiusAlpha = linearValue(
        0,
        100,
        1,
        0,
        particleData[ofBoundary][particleIndex].infectionAnimationFrame
      );

      options = {};
      options.x = partDB[particleIndex].x;
      options.y = partDB[particleIndex].y;
      options.radius = cinfectradius;

      if (
        particleData[ofBoundary][particleIndex].infectionAnimationFrame > 100
      ) {
        particleData[ofBoundary][particleIndex].infectionAnimation = false;
        particleData[ofBoundary][particleIndex].infectionAnimationFrame = 0;
      }
      options.stroke =
        "hsla(" +
        particleData[ofBoundary][particleIndex].color +
        "," +
        cinfectradiusAlpha +
        ")";
      updateCircle(
        boundaryData[ofBoundary]["graph"],
        "particleCircle@" + particleIndex,
        options
      );
    }
  }
}

function updatePlotGraph() {
  graphForParticle = currentSimG;
  totalP =
    particleCounts[graphForParticle]["infected"] +
    particleCounts[graphForParticle]["susceptible"] +
    particleCounts[graphForParticle]["removed"];

  removedV = (particleCounts[graphForParticle]["removed"] * 100) / totalP;
  infectedV = (particleCounts[graphForParticle]["infected"] * 100) / totalP;
  susceptibleV =
    (particleCounts[graphForParticle]["susceptible"] * 100) / totalP;

  if (particleCountTimeLine[graphForParticle]["removed"].length > 0) {
    particleCountTimeLine[graphForParticle]["removed"].pop();
    particleCountTimeLine[graphForParticle]["infected"].pop();
    particleCountTimeLine[graphForParticle]["susceptible"].pop();

    particleCountTimeLine[graphForParticle]["removed"].pop();
    particleCountTimeLine[graphForParticle]["infected"].pop();
    particleCountTimeLine[graphForParticle]["susceptible"].pop();
  }
  particleCountTimeLine[graphForParticle]["removed"].push([dayCount, 100]);
  particleCountTimeLine[graphForParticle]["susceptible"].push([
    dayCount,
    susceptibleV + infectedV,
  ]);
  particleCountTimeLine[graphForParticle]["infected"].push([
    dayCount,
    infectedV,
  ]);

  if (dayCount > 10) {
    graphData["plotG"].xmajorgridlabelOnlyIf =
      "value >= 0 && value <= " + dayCount;
    updateGraphZoom("plotG", { xmax: dayCount + dayCount * 0.3 });
  }

  particleCountTimeLine[graphForParticle]["removed"].push([dayCount, 0]);
  particleCountTimeLine[graphForParticle]["infected"].push([dayCount, 0]);
  particleCountTimeLine[graphForParticle]["susceptible"].push([dayCount, 0]);

  particleCountTimeLine[graphForParticle]["removed"].push([0, 0]);
  particleCountTimeLine[graphForParticle]["infected"].push([0, 0]);
  particleCountTimeLine[graphForParticle]["susceptible"].push([0, 0]);

  updatePathPoints(
    "plotG",
    "removedLine",
    particleCountTimeLine[graphForParticle]["removed"]
  );
  updatePathPoints(
    "plotG",
    "infectedLine",
    particleCountTimeLine[graphForParticle]["infected"]
  );
  updatePathPoints(
    "plotG",
    "susceptibleLine",
    particleCountTimeLine[graphForParticle]["susceptible"]
  );

  options = {};
  options.text = removedV.toFixed(1) + "% removed";
  options.y = (100 + infectedV + susceptibleV) / 2;
  yremovedTextLoc = (100 + infectedV + susceptibleV) / 2;
  if (dayCount >= 10) {
    options.x = dayCount * 1.03;
  }
  updateText("plotG", "removedText", options);

  options = {};
  options.text = susceptibleV.toFixed(1) + "% susceptible";
  options.y = (susceptibleV + infectedV + infectedV) / 2;
  ysusceptibleTextLoc = (susceptibleV + infectedV + infectedV) / 2;
  if ((100 - infectedV) / 2 < 15) {
    options.y = (100 + infectedV + susceptibleV) / 2 - 15;
    ysusceptibleTextLoc = (100 + infectedV + susceptibleV) / 2 - 15;
  }
  if (dayCount >= 10) {
    options.x = dayCount * 1.03;
  }
  updateText("plotG", "susceptibleText", options);

  options = {};
  options.text = infectedV.toFixed(1) + "% infected";
  options.y = infectedV / 2;
  if (ysusceptibleTextLoc - infectedV / 2 < 15) {
    options.y = ysusceptibleTextLoc - 15;
  }
  if (dayCount >= 10) {
    options.x = dayCount * 1.03;
  }
  updateText("plotG", "infectedText", options);

  casesSoFar = 0;
  totalInfections = 0;
  for (var infectedParticle in particleInfectionCount[graphForParticle]) {
    if (
      particleInfectionCount[graphForParticle][infectedParticle].infectionC > 0
    ) {
      casesSoFar = casesSoFar + 1;
      totalInfections =
        totalInfections +
        particleInfectionCount[graphForParticle][infectedParticle].infectionC;
    }
  }

  // document.getElementById('R_0').innerHTML = 'R : ' + (totalInfections/casesSoFar).toFixed(2)
  // console.log(totalInfections/casesSoFar, casesSoFar*100/totalP)
}

function updatePlotGraph() {
  graphForParticle = currentSimG;
  totalP =
    particleCounts[graphForParticle]["infected"] +
    particleCounts[graphForParticle]["susceptible"] +
    particleCounts[graphForParticle]["removed"];

  removedV = (particleCounts[graphForParticle]["removed"] * 100) / totalP;
  infectedV = (particleCounts[graphForParticle]["infected"] * 100) / totalP;
  susceptibleV =
    (particleCounts[graphForParticle]["susceptible"] * 100) / totalP;

  if (particleCountTimeLine[graphForParticle]["removed"].length > 0) {
    particleCountTimeLine[graphForParticle]["removed"].pop();
    particleCountTimeLine[graphForParticle]["infected"].pop();
    particleCountTimeLine[graphForParticle]["susceptible"].pop();

    particleCountTimeLine[graphForParticle]["removed"].pop();
    particleCountTimeLine[graphForParticle]["infected"].pop();
    particleCountTimeLine[graphForParticle]["susceptible"].pop();
  }
  particleCountTimeLine[graphForParticle]["removed"].push([dayCount, 100]);
  particleCountTimeLine[graphForParticle]["susceptible"].push([
    dayCount,
    susceptibleV + infectedV,
  ]);
  particleCountTimeLine[graphForParticle]["infected"].push([
    dayCount,
    infectedV,
  ]);

  if (dayCount > 10) {
    graphData["plotG"].xmajorgridlabelOnlyIf =
      "value >= 0 && value <= " + dayCount;
    updateGraphZoom("plotG", { xmax: dayCount + dayCount * 0.3 });
  }

  particleCountTimeLine[graphForParticle]["removed"].push([dayCount, 0]);
  particleCountTimeLine[graphForParticle]["infected"].push([dayCount, 0]);
  particleCountTimeLine[graphForParticle]["susceptible"].push([dayCount, 0]);

  particleCountTimeLine[graphForParticle]["removed"].push([0, 0]);
  particleCountTimeLine[graphForParticle]["infected"].push([0, 0]);
  particleCountTimeLine[graphForParticle]["susceptible"].push([0, 0]);

  updatePathPoints(
    "plotG",
    "removedLine",
    particleCountTimeLine[graphForParticle]["removed"]
  );
  updatePathPoints(
    "plotG",
    "infectedLine",
    particleCountTimeLine[graphForParticle]["infected"]
  );
  updatePathPoints(
    "plotG",
    "susceptibleLine",
    particleCountTimeLine[graphForParticle]["susceptible"]
  );

  options = {};
  options.text = removedV.toFixed(1) + "% removed";
  options.y = (100 + infectedV + susceptibleV) / 2;
  yremovedTextLoc = (100 + infectedV + susceptibleV) / 2;
  if (dayCount >= 10) {
    options.x = dayCount * 1.03;
  }
  updateText("plotG", "removedText", options);

  options = {};
  options.text = susceptibleV.toFixed(1) + "% susceptible";
  options.y = (susceptibleV + infectedV + infectedV) / 2;
  ysusceptibleTextLoc = (susceptibleV + infectedV + infectedV) / 2;
  if ((100 - infectedV) / 2 < 15) {
    options.y = (100 + infectedV + susceptibleV) / 2 - 15;
    ysusceptibleTextLoc = (100 + infectedV + susceptibleV) / 2 - 15;
  }
  if (dayCount >= 10) {
    options.x = dayCount * 1.03;
  }
  updateText("plotG", "susceptibleText", options);

  options = {};
  options.text = infectedV.toFixed(1) + "% infected";
  options.y = infectedV / 2;
  if (ysusceptibleTextLoc - infectedV / 2 < 15) {
    options.y = ysusceptibleTextLoc - 15;
  }
  if (dayCount >= 10) {
    options.x = dayCount * 1.03;
  }
  updateText("plotG", "infectedText", options);

  casesSoFar = 0;
  totalInfections = 0;
  for (var infectedParticle in particleInfectionCount[graphForParticle]) {
    if (
      particleInfectionCount[graphForParticle][infectedParticle].infectionC > 0
    ) {
      casesSoFar = casesSoFar + 1;
      totalInfections =
        totalInfections +
        particleInfectionCount[graphForParticle][infectedParticle].infectionC;
    }
  }

  // document.getElementById('R_0').innerHTML = 'R : ' + (totalInfections/casesSoFar).toFixed(2)
  // console.log(totalInfections/casesSoFar, casesSoFar*100/totalP)
}

function handleAnimationPlaying() {
  if (currentSim == "simpleCase") {
    animateParticles("simpleCaseGraphB");
  } else if (currentSim == "simpleCase&Q") {
    animateParticles("simpleCaseGraph&QB");
    animateParticles("simpleQuarantineB");
  } else if (currentSim == "centralLocationCase") {
    animateParticles("centralLocationCaseB");
  } else if (currentSim == "centralLocationQuarantineCase") {
    animateParticles("centralLocationQuarantineCaseB");
    animateParticles("centralLocationQuarantineB");
  } else if (currentSim == "communitiesCase") {
    for (bdi = 0; bdi < 3; bdi++) {
      for (bdj = 0; bdj < 3; bdj++) {
        animateParticles("communitiesCaseB_" + bdi + "_" + bdj);
      }
    }
  } else if (currentSim == "communitiesQuarantineCase") {
    for (bdi = 0; bdi < 3; bdi++) {
      for (bdj = 0; bdj < 3; bdj++) {
        animateParticles("communitiesQuarantineCaseB_" + bdi + "_" + bdj);
      }
    }
    animateParticles("communitiesQuarantineB");
  }
}

function setAnimationDetails() {
  frameInterval = 1000 / simulationParameters.frameRate;

  calculationFrameInterval =
    (simulationParameters.frameRate /
      (timeStepsPerDay * simulationParameters.daysEverySecond)) *
    frameInterval;
}
setAnimationDetails();

dayCount = 0;

function playAnimationLoop(event) {
  loopinterval = setInterval(frame, frameInterval);
  function frame() {
    loopcount = loopcount + 1;
    if (playing) {
      handleAnimationPlaying();
    }
  }
}

function interactions(ofBoundary) {
  partDB = particleData[ofBoundary];
  for (var vicinityParticle in partDB) {
    // if (
    //   particleData[ofBoundary][mainParticle].state == "infected"
    //   // && particleData[ofBoundary][mainParticle].moveAnimation == false
    // ) {
    //   vicinityN = getParticleVicinityN(
    //     [
    //       particleData[ofBoundary][mainParticle].x,
    //       particleData[ofBoundary][mainParticle].y,
    //     ],
    //     ofBoundary
    //   );
    //   particlesSusceptible = getSurrounding(vicinityN, ofBoundary);

    options.pointcolor =
      "hsla(" + particleData[ofBoundary][vicinityParticle].color + ",1)";
    // if (Math.random() < simulationParameters.probabilityOfNoSymptoms) {
    //   particleData[ofBoundary][vicinityParticle].showsSymptoms = false;
    //   particleData[ofBoundary][vicinityParticle].color =
    //     stateColors["noSymptoms"];
    //   options.pointcolor =
    //     "hsla(" +
    //     particleData[ofBoundary][vicinityParticle].color +
    //     ",1)";
    // }
    updatePoint(
      boundaryData[ofBoundary]["graph"],
      "particle@" + vicinityParticle,
      options
    );
  }
}
function handleCalculationPlaying() {
  if (currentSim == "simpleCase") {
    moveParticles("simpleCaseGraphB");
    updatePlotGraph();
    interactions("simpleCaseGraphB");
    dayCount = dayCount + 1;
    // if (timecount % timeStepsPerDay == 0) {
    //   prepInteractionData("simpleCaseGraphB");
    // }
  }
  //   if (timecount % timeStepsPerDay == 1) {
  //     updatePlotGraph();
  //     interactions("simpleCaseGraphB");
  //     dayCount = dayCount + 1;
  //   }
  // } else if (currentSim == "simpleCase&Q") {
  //   moveParticles("simpleCaseGraph&QB");
  //   moveParticles("simpleQuarantineB");
  //   if (timecount % timeStepsPerDay == 0) {
  //     prepInteractionData("simpleCaseGraph&QB");
  //     prepInteractionData("simpleQuarantineB");
  //   }
  //   if (timecount % timeStepsPerDay == 1) {
  //     updatePlotGraph();
  //     interactions("simpleCaseGraph&QB");
  //     interactions("simpleQuarantineB");
  //     dayCount = dayCount + 1;
  //   }
  // } else if (currentSim == "centralLocationCase") {
  //   moveParticles("centralLocationCaseB");
  //   if (timecount % timeStepsPerDay == 0) {
  //     prepInteractionData("centralLocationCaseB");
  //   }
  //   if (timecount % timeStepsPerDay == 1) {
  //     updatePlotGraph();
  //     interactions("centralLocationCaseB");
  //     dayCount = dayCount + 1;
  //   }
  // } else if (currentSim == "centralLocationQuarantineCase") {
  //   moveParticles("centralLocationQuarantineCaseB");
  //   moveParticles("centralLocationQuarantineB");
  //   if (timecount % timeStepsPerDay == 0) {
  //     prepInteractionData("centralLocationQuarantineCaseB");
  //     prepInteractionData("centralLocationQuarantineB");
  //   }
  //   if (timecount % timeStepsPerDay == 1) {
  //     updatePlotGraph();
  //     interactions("centralLocationQuarantineCaseB");
  //     interactions("centralLocationQuarantineB");
  //     dayCount = dayCount + 1;
  //   }
  // } else if (currentSim == "communitiesCase") {
  //   for (bdi = 0; bdi < 3; bdi++) {
  //     for (bdj = 0; bdj < 3; bdj++) {
  //       moveParticles("communitiesCaseB_" + bdi + "_" + bdj);
  //     }
  //   }
  //   if (timecount % timeStepsPerDay == 0) {
  //     for (bdi = 0; bdi < 3; bdi++) {
  //       for (bdj = 0; bdj < 3; bdj++) {
  //         prepInteractionData("communitiesCaseB_" + bdi + "_" + bdj);
  //       }
  //     }
  //   }
  //   if (timecount % timeStepsPerDay == 1) {
  //     updatePlotGraph();
  //     for (bdi = 0; bdi < 3; bdi++) {
  //       for (bdj = 0; bdj < 3; bdj++) {
  //         interactions("communitiesCaseB_" + bdi + "_" + bdj);
  //       }
  //     }
  //     dayCount = dayCount + 1;
  //   }
  // } else if (currentSim == "communitiesQuarantineCase") {
  //   for (bdi = 0; bdi < 3; bdi++) {
  //     for (bdj = 0; bdj < 3; bdj++) {
  //       moveParticles("communitiesQuarantineCaseB_" + bdi + "_" + bdj);
  //     }
  //   }
  //   moveParticles("communitiesQuarantineB");
  //   if (timecount % timeStepsPerDay == 0) {
  //     for (bdi = 0; bdi < 3; bdi++) {
  //       for (bdj = 0; bdj < 3; bdj++) {
  //         prepInteractionData("communitiesQuarantineCaseB_" + bdi + "_" + bdj);
  //       }
  //     }
  //     prepInteractionData("communitiesQuarantineB");
  //   }

  //   if (timecount % timeStepsPerDay == 1) {
  //     updatePlotGraph();
  //     for (bdi = 0; bdi < 3; bdi++) {
  //       for (bdj = 0; bdj < 3; bdj++) {
  //         interactions("communitiesQuarantineCaseB_" + bdi + "_" + bdj);
  //       }
  //     }
  //     interactions("communitiesQuarantineB");
  //     dayCount = dayCount + 1;
  //   }
  // }
}

function playCalculationLoop(event) {
  loopinterval2 = setInterval(frame, calculationFrameInterval * 15); // TODO dirty slow down
  //sleep(200000);
  function frame() {
    timecount = timecount + 1;
    if (timecount >= 100) {
      return;
    } // TODO dirty stop
    if (playing) {
      handleCalculationPlaying();
    }
  }
}
playCalculationLoop();
playAnimationLoop();

function playpauseSim(event) {
  if (playing) {
    playing = false;
    document.getElementById("playbutton").value = "PLAY";
  } else {
    playing = true;
    document.getElementById("playbutton").value = "PAUSE";
  }
}
// TODO read current config
function startSim(event) {
  const config = {
    population_size: 100,
    nbr_timesteps: 100,
    dt_days: 0.5,
    infection_duration_days: 10,
    dimension_x: 1.0,
    dimension_y: 1.0,
    moving_speed: 0.1,
    infection_probability_day: 0.5,
    infection_radius: 0.5,
  };
  const str = JSON.stringify(config);
  fetch("http://localhost:3000/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: str,
  });
  console.log("Clicked start sim");
}
