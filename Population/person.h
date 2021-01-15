#pragma once
#include <array>
#include "enums.h"
#include <string>
#include <iostream>
#include <Eigen/Core>
struct Position
{
    Position(double x, double y) : x(x), y(y){};
    double x;
    double y;
};

class Person
{
public:
    Person(Eigen::Vector2d p, double step_size = 1.);
    void move(double dx, double dy, bool change_position = true);
    const Eigen::Vector2d& get_position() const;
    std::string get_state_string() const;
    void set_state(State s) { state = s; }
    State state;
    friend std::ostream& operator<<(std::ostream& os, const Person& p);
    double infection_start_time;
    Eigen::Vector2d position;
    Eigen::Vector2d velocity;

private:
    double step_size_;
};