# AdvProg_InfectionModelling
This is our project
And before merging, we need to change things

# Installation
0. Install Eigen
   ```
   sudo apt install libeigen3-dev
   ```
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

Please be aware that with the current configuration, cmake needs to be executed after each newly added file.
Also, C++ 20 is configured, so use GCC 10 or set lower in cmake config!

# Acknowledgement
The JSON parser was taken from https://github.com/amir-s/jute