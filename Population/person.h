#include <array>
#include "enums.h"
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
    void move(double dx, double dy);
    Position get_position() const;

private:
    Position position_;
    State state_;
    double step_size_;
};