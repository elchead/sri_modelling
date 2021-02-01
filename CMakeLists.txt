cmake_minimum_required(VERSION 3.13)

# set the project name
project(InfectionModelling VERSION 0.1)

# add the executable
add_executable(InfectionModelling main.cpp)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# add the Population library
add_subdirectory(Population)

# Find at least version 3.3 of Eigen3
find_package (Eigen3 3.3 REQUIRED NO_MODULE)
#
target_link_libraries (InfectionModelling PUBLIC Population)

target_link_libraries(Population Eigen3::Eigen)

# add the binary tree to the search path for include files
# so that we will find TutorialConfig.h
target_include_directories(InfectionModelling PUBLIC
                          "${PROJECT_BINARY_DIR}"
                          "${PROJECT_SOURCE_DIR}/Population"
                          )