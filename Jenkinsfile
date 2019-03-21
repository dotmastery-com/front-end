pipeline {
    agent none

    environment {
        registry = "dotmastery/front-end"
    }
    stages {


        stage('Build and Push Docker Image') {
          agent any  

          steps {
            script {
                dockerImage = docker.build registry +"$BUILD_NUMBER"
                dockerImage.push()
            }    

         }
        }

    }
}