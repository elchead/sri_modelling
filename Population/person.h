#include <array>
#include "enums.h"
#include <string>
#include <iostream>
struct Position
{
    Position(double x, double y) : x(x), y(y){};
    double x;
    double y;
};

class Person
{
public:
    Person(Position p, double step_size = 1.);
    Position move(double dx, double dy, bool change_position = true);
    Position get_position() const;
    std::string get_state_string() const;

private:
    Position position_;
    State state_;
    double step_size_;
};