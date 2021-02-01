file(GLOB codefiles_SRC
    "*.h"
    "*.cpp"
)

add_library(Population ${codefiles_SRC})