#include <array>
#include "enums.h"

class Person
{
public:
    void move() const;

private:
    std::array<double, 2> position_;
    State state_;
};