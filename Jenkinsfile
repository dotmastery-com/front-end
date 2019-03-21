pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
  tools {
        org.jenkinsci.plugins.docker.commons.tools.DockerTool 'docker' 
    }

    environment {
        registry = "dotmastery/front-end"
    }
    stages {

        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }

        stage('Build and Push Docker Image') {

          steps {
            script {
                dockerImage = docker.build registry +"$BUILD_NUMBER"
                dockerImage.push()
            }    

         }
        }

    }
}