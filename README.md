# Music Manager System

One Paragraph of project description goes here

## Getting Started

The project was build by Karaf apache.
Use cxf Apache to build RESTFul API
Use Karaf war to build Front-end web-app

### Prerequisites

To use re-build this project, you need install Karaf

* [Karaf Runtime](https://karaf.apache.org/download.html) - The projetc apache used

### Installing

Download music-sys and build:

```
mvn clean install
```

Repo Feature:

```
feature:repo-add mvn:org.tma.com.vn/music-sys-feature/LATEST/xml
```

Install Feature Datasouce:

```
feature:install music-sys-datasource
```

Install Feature service:

```
feature:install music-sys-service
```

Install Feature RESTFul:

```
feature:install music-sys-rest
```
Install web-app:

```
bundle:install -s webbundle:mvn:org.tma.com.vn/music-sys-webapp/1.0/war?Web-ContextPath=cxf/music/manager/system
```

## Running the tests

Use PostMan application to test RESTFul API
