const address = "http://localhost";
const csv_port = "8080";
simpleCaseBoundaryRanges = [-1, 1, -1, 1];
boundaryData = {};
particleData = {};
darkmode = true;

// $("#SimParams").submit(function (e) {
//   setTimeout(function () {
//     location.reload(true);
//   }, 2000);
// });

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

  //   createVicinityDB(boundaryN);
}

// function handleLayout1() {
//   if (dmode == "landscape") {
//     document.getElementById("mainVSpacer1").style.width = "2%";
//     document.getElementById("MainBlock1").style.width = "48%";
//     document.getElementById("mainVSpacer2").style.width = "5%";
//     document.getElementById("MainBlock2").style.width = "43%";
//     document.getElementById("mainVSpacer3").style.width = "2%";

//     $("#plotGraphH").appendTo("#MainBlock1");
//     $("#mainB2HSpacer5").appendTo("#MainBlock1");
//     $("#parametersH").appendTo("#MainBlock1");
//     $("#mainB2HSpacer6").appendTo("#MainBlock1");

//     document.getElementById("mainB2HSpacer1").style.height = "3%";
//     document.getElementById("maintitle").style.textAlign = "right";
//     // document.getElementById('titleH').style.height = '15%'
//     document.getElementById("maintitle").style.fontSize = "2vmax";

//     document.getElementById("maintitle").innerHTML =
//       "<font style='font-weight: bold;'>Epidemic Simulation </font><br/><font style='font-family: Source Sans Pro; font-size: 1.1vmax; vertical-align: bottom;'>An interactive inspired by 3Blue1Brown's <a href='https://www.youtube.com/watch?v=gxAaO2rsdIs' style='text-decoration: none; cursor: pointer;' target='_blank'><font style='color: hsla(197, 100%, 50%, 1);'>'Simulating an Epidemic' video</font></a><br/><font style='font-size: 0.9vmax'>Credits for the webapp visualization go to <a href='https://prajwalsouza.github.io/Experiments/Epidemic-Simulation.html' style='text-decoration: none; cursor: pointer;' target='_blank'><font style='color: hsla(280, 100%, 70%, 1);'>prajwalsouza.github.io</font></a></font></font>";

//     document.getElementById("mainB2HSpacer2").style.height = "3%";
//     document.getElementById("caseTypeNameH").style.height = "4%";
//     document.getElementById("caseTypeNameH").style.fontSize = "1vmax";

//     document.getElementById("upperLayer").style.height = "65%";
//     document.getElementById("simpleCaseGraphH").style.height = "65%";
//     // document.getElementById("centralLocationCaseGraphH").style.height = "65%";
//     // document.getElementById("communitiesCaseGraphH").style.height = "65%";
//     // document.getElementById("simpleCaseGraph&QH").style.height = "65%";
//     // document.getElementById(
//     //   "centralLocationQuarantineCaseGraphH"
//     // ).style.height = "65%";
//     // document.getElementById("communitiesQuarantineCaseGraphH").style.height =
//     //   "65%";

//     // document.getElementById("play-Info-QuarantineH").style.height = "4%";

//     document.getElementById("playbutton").style.fontSize = "0.8vmax";
//     document.getElementById("resetbutton").style.fontSize = "0.8vmax";

//     document.getElementById("playButtonH").style.width = "12%";
//     document.getElementById("resetButtonH").style.width = "12%";

//     // document.getElementById("play-Info-QuarantineHSpacer1").style.width = "4%";

//     document.getElementById("infoH").style.fontSize = "0.8vmax";
//     document.getElementById("infoH").style.width = "100%";

//     // document.getElementById("quarantineH").style.fontSize = "0.9vmax";
//     // document.getElementById("quarantineH").style.float = "right";
//     // document.getElementById("quarantineH").style.width = "25%";
//     // document.getElementById("quarantineH").style.fontFamily = "Source Sans Pro";
//     // document.getElementById("quarantinecheckLabel").style.fontSize = "0.9vmax";

//     document.getElementById("mainB2HSpacer3").style.height = "3%";
//     document.getElementById("caseTypeChooseH").style.height = "4%";

//     document.getElementById("simpleCaseoption").style.fontSize = "0.86vmax";
//     document.getElementById("centralLocationoption").style.fontSize =
//       "0.86vmax";
//     document.getElementById("communitiesoption").style.fontSize = "0.86vmax";

//     // document.getElementById("simpleCaseoptionH").style.width = "14%";
//     // document.getElementById("centralLocationoptionH").style.width = "27%";
//     // document.getElementById("communitiesoptionH").style.width = "23%";

//     // // $('#CommunitiesoptionH').insertBefore('#simpleCaseoptionH')
//     // // $('#centralLocationoptionH').insertBefore('#simpleCaseoptionH')

//     // $("#quarantineH").insertAfter("#communitiesoptionH");

//     // document.getElementById('simpleCaseoptionH').style.float = 'right'
//     // document.getElementById('centralLocationoptionH').style.float = 'right'
//     // document.getElementById('CommunitiesoptionH').style.float = 'right'

//     document.getElementById("plotGraphH").style.height = "40%";
//     //document.getElementById("parametersH").style.height = "45%";

//     // document.getElementById("parametersTitleText").style.fontSize = "1.1vmax";
//     // document.getElementById("parametersTitleText").style.height = "10%";

//     // document.getElementById("additionalPText").style.fontSize = "0.7vmax";

//     // document.getElementById("parametersListH").style.fontSize = "0.96vmax";

//     document.getElementById("mainB2HSpacer6").style.height = "1%";

//     $("#infoH").insertAfter("#mainB2HSpacer6");

//     document.getElementById("gradfillParameters").style.background =
//       "linear-gradient(to bottom,hsla(0, 0%, 0%, 0), hsla(0, 100%, 100%, 0) 8%, hsla(0, 100%, 0%, 1) 10%, hsla(0, 100%, 100%, 0) 14%, hsla(0, 0%, 0%, 0) 88%,hsla(0, 100%, 0%, 1) 100%,hsla(0, 100%, 100%, 0) 100%,hsla(0, 100%, 100%, 0))";
//   }
// }

// handleLayout1();

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

function updateCsvPosState(boundaryN, graphN, statuses, pos_x, pos_y) {
  // Check to see if the counter has been initialized
  if (typeof updateCsvPosState.counter == "undefined") {
    // It has not... perform the initialization
    updateCsvPosState.counter = 1;
  }
  simulationParameters.numberOfParticles = statuses.length;
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

    particleData[boundaryN][particleID].x = pos_x[particleID - 1]; ////bdexclusionSX * bdexclusionRX+ bdexclusionSX + (Math.random())
    particleData[boundaryN][particleID].y = pos_y[particleID - 1]; //bdexclusionSY + * bdexclusionRY

    // update states
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

    particleData[boundaryN][particleID].color =
      stateColors[particleData[boundaryN][particleID].state];

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
  const pop_id = 1;
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      crossDomain: true,
      url:
        address + ":" + csv_port + `/Population${pop_id}/data_${timestep}.csv`,

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
        //lines.push(tarr);
      }
    }
    updateCsvPosState(boundaryN, graphN, statuses, pos_x, pos_y);
  }
}

// Main Code begins here.

// starts playing animations when the browser loads. Changing this on demand anywhere can pause animations.
playing = true;

// TODO adjust rate
frameRate = 3;

frameInterval = 1000 / frameRate;

// This is the importart part which sets up the graph.
function setUpGraph() {
  graphH = document.getElementById("simpleCaseGraphH");
  graphoptions = {};
  graphoptions.xmax = simpleCaseBoundaryRanges[1];
  graphoptions.xmin = simpleCaseBoundaryRanges[0];

  graphoptions.ymax = simpleCaseBoundaryRanges[3];
  graphoptions.ymin = simpleCaseBoundaryRanges[2];
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

  graphoptions.scrollZoom = "no";
  graphoptions.draggability = "no";

  addGraph(graphH, "simpleCaseGraphG", graphoptions); //TODO why G??
  // addGraph(div location inside which the graph gets added,     graph name,     parameters we described for the graph)
  boundaryProperties = {};
  boundaryProperties.color = "white";
  drawBoundary(
    "simpleCaseGraphG",
    "simpleCaseGraphB",
    simpleCaseBoundaryRanges,
    boundaryProperties
  );
}

// We set up the graph
setUpGraph();

// Add objects to the graph called 'GraphName'
function addObjects() {
  // We can add the following objects
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

  //   boundaryData["simpleCaseGraphB"]["particleNumber"] =
  //     simulationParameters.numberOfParticles;

  // add particles
  readCsv(1, "simpleCaseGraphG", "simpleCaseGraphB");
}

addObjects();

// This is invoked inside the calculation loop. It calculates object positions.
// Not using this, this time.
function moveObjects() {}

// This is invoked inside the animation loop. It plots object positions/changes.
function plotObjects(timestep) {
  readCsv(timestep, "simpleCaseGraphG", "simpleCaseGraphB");
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  sleep(2000);
  updatePoints("simpleCaseGraphB");
}

function updatePoints(name) {
  partDB = particleData[name];
  for (i = 1; i < simulationParameters.numberOfParticles + 1; i++) {
    const part = particleData[name][i];
    options = {};
    options.pointcolor = "hsla(" + part.color + ",1)";
    updatePointXY(boundaryData[name]["graph"], "particle@" + i, part.x, part.y);
    updatePoint(boundaryData[name]["graph"], "particle@" + i, options);
  }
}
// Animation Handler
animLoopCount = 1;

function playAnimationLoop(event) {
  loopinterval = setInterval(frame, frameInterval);
  function frame() {
    animLoopCount = animLoopCount + 1;
    if (playing) {
      plotObjects(animLoopCount);
    }
  }
}

playAnimationLoop();
