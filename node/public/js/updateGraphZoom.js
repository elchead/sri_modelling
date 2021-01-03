export function updateGraphZoom(graphname, newMinMax) {
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
