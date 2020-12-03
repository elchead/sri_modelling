#include "person.h"

Person::Person(Position p, double step_size) : position_(p), step_size_(step_size)
{
}

Position Person::get_position() const
{
    return position_;
}

void Person::move(double dx, double dy)
{
    position_.x += dx;
    position_.y += dy;
}

std::ostream &operator<<(std::ostream &output, const Person &p)
{
    const auto pos = p.get_position();
    output
        << "Person at : (" << pos.x << " " << pos.y << ")";
    return output;
}