# meto_resource
I need to design and implement a web application using Python.

The application should support CRUD operations for the resource entity.
A resource is a kind of generalized view of an object in the real world that can be used to perform some work, for example, a dump truck or an excavator.
Resource has resource type, name and current speed.
Resource type has name and maximum allowable speed.

## Example:
In the system there are dump trucks "101" and "102",  excavators "E103" and "E104".
The truck has a maximum speed of 80 km/h, the excavator has 40 km/h.
At the moment, "101" rides at a speed of 63 km/h, "102" - 85 km/h, "E103" - 60 km/h, and "E104" stands in place.

## Functional requirement
the service must support the WSGI protocol, i.e. it can be run by uwsgi/gunicorn/unit;
Read/create/modify/delete records
you can delete several records at once;
it is possible to add both resources and their types;
all end points accept and give the data as json;
you can get a list of all filtered resources by type;
when reading resources there is an additional field - exceeding the maximum speed in percent.

## Non-functional requirements
the service should be written in pure Python, without the use of frameworks and third-party libraries (you can use any version of psycopg or similar);
the service uses a database to store data (for example, Postgres);
solution is available in github/gitlab/etc.;
Dockerfile with image description.

## Additional tasks (optional)
service is covered with unit tests;
there are data fixtures to fill in the database;
docker-compose.yml for project turnaround;
simple UI using any js framework;
clean or hexagonal architecture principles are used;
you can make ASGI instead of WSGI.
