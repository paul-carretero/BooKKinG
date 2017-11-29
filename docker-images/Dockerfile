FROM jboss/wildfly

ADD deployments/BooKKinG-Server.ear /opt/jboss/wildfly/standalone/deployments/${APP_FILE}
ADD deployments/mysql-connector-java-5.1.44-bin.jar /opt/jboss/wildfly/standalone/deployments/${JDBC_FILE}

ADD configuration/standalone-ha-1.xml /opt/jboss/wildfly/standalone/configuration/standalone-ha-1.xml
ADD configuration/standalone-ha-2.xml /opt/jboss/wildfly/standalone/configuration/standalone-ha-2.xml

RUN /opt/jboss/wildfly/bin/add-user.sh manager 1a2z3e! --silent
