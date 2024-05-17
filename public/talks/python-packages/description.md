Python packaging is quite complex, and it's easy to be lost with all the options and concepts as an Engineer. Yet,
understanding the basic concepts of packaging can be helpful, even as a consumer of external libraries, as it can for
instance reduce dependency installation time, or reduce production Docker images size, if done correctly.

This talk's purpose is to give you a better understanding of some Python packaging concepts as a service maintainer,
by answering questions like:

- what is a build backend?
- what is a wheel, and what problems does it resolve?
- why do some packages need to provide one wheel per OS architecture and/or Python version?
- what is a dependency marker?
