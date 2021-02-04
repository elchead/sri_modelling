# Advanced Programming Project: Infection Modelling

This project implements a simple 2D simulation of the SRI model. It specifically uses the tools we learnt during the semester including **modern C++ concepts**, **Eigen library**, **Unit tests with Catch2**, **cmake** and **gprof**.
For convenience, a very simple **web interface** for visualizing and configuring the simulation is provided.

To simplify the installation procedure and avoid potential local issues, a **Docker** container is also made available.

# Installation

The most convenient way to build, run and configure the simulation is using a Docker container. It also provides a browser interface for visualization and configuring the simulation parameters.

However, the executable or the web server can also be locally run.

## Using Docker

1. In root directory, create Docker image:

   ```
   docker image build -t infectionmodel .
   ```

2. Ready to go :)

## Local installation

### Prequisites

- Compiler supporting C++ 17: e.g. GCC
  ```
  sudo apt install -y libeigen3-dev
  ```
- cmake
  ```
  sudo apt install cmake
  ```
- Eigen library
  ```
  sudo apt install libeigen3-dev
  ```

### Steps

1. Create build directory
   ```
   mkdir build
   ```
2. Execute Cmake in build directory
   ```
   cd build
   cmake ..
   ```
3. Build executable
   ```
   cmake --build .
   ```

# Run

## Using Docker

### Browser visualization

1. Run Docker container
   ```
   docker container run -it -p 3000:3000 -p 8080:8080 infectionmodel
   ```
2. Open Simulation-Endpoint link in console output (`http://localhost:3000`)

### Manually run and configure simulation

1. Run bash of Docker container
   ```
   docker container run -it -p 3000:3000 -p 8080:8080 infectionmodel bash
   ```
2. Go to root directory
   ```
   cd ..
   ```
3. Edit `config.json`
4. Execute simulation
   ```
   cd build
   ./InfectionModelling
   ```

## Local run

### Manually run and configure simulation

1. Adjust `config.json`
2. In build folder run: `./InfectionModelling`

### Browser visualization

1. Install npm modules

   ```
   npm install
   ```

2. Run node app
   ```
   npm start
   ```

### Profiling

1. In build folder, run cmake
   ```
   cmake -DCMAKE_CXX_FLAGS=-pg ..
   ```
2. Build executable
   ```
   cmake --build .
   ```
3. Run executable
   ```
   ./InfectionModelling
   ```
4. Write analysis to `report.txt` file
   ```
   gprof InfectionModelling gmon.out > report.txt
   ```

<!-- Please be aware that with the current configuration, cmake needs to be executed after each newly added file. -->

# Acknowledgement

The JSON parser was taken from https://github.com/amir-s/jute

The browser simulation was inspired by https://prajwalsouza.github.io/Experiments/Epidemic-Simulation.html
