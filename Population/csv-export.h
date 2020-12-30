#pragma once
#include <fstream>
#include "person.h"

class CSV
{
 public:
 CSV(const char *filename) : writer_(filename,std::ios_base::out) {
     writer_ << "state,pos_x,pos_y\n";
 }
 void exporter(const std::vector<Person>& persons) {
     for(const auto& person : persons){
         writer_ << person;
     }
     writer_ << std::endl;
 }

 private: 
 std::ofstream writer_;
};