# set one only! (use header for convenience)
set(CatchLibH "Header-only")
#set(CatchLibV "VCPKG") # only to test using library

cmake_minimum_required(VERSION 3.13)
if(CatchLibV)
    set(CMAKE_TOOLCHAIN_FILE "/home/adria/dev/vcpkg/scripts/buildsystems/vcpkg.cmake")
endif()
# set the project name
project(InfectionModelling VERSION 0.1)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set (CMAKE_CXX_FLAGS "-O0 -pg")

# add the Population library
add_subdirectory(Population)

# Find at least version 3.3 of Eigen3
find_package (Eigen3 3.3 REQUIRED NO_MODULE)

# add the executable
add_executable(InfectionModelling main.cpp)

# add testing executable
if(CatchLibV)
    find_package(Catch2 CONFIG REQUIRED)
    add_executable(tests ./tests/test.cpp)
    target_link_libraries(tests PRIVATE Catch2::Catch2 Population)
endif()
if(CatchLibH)
    add_executable(tests ./tests/test.cpp ./tests/catch_amalgamated.cpp)
    target_link_libraries(tests PRIVATE Population)
endif()

# link libraries
target_link_libraries (InfectionModelling PUBLIC Population)
target_link_libraries(Population Eigen3::Eigen)

# add the header search path for include files, such that we find the Population header files
target_include_directories(InfectionModelling PUBLIC
                          "${PROJECT_BINARY_DIR}"
                          "${PROJECT_SOURCE_DIR}/Population"
                          )
target_include_directories(tests PRIVATE "${PROJECT_BINARY_DIR}"
                          "${PROJECT_SOURCE_DIR}/Population")