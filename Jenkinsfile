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

                def root = tool name: 'docker', type: 'docker'
                
                docker.withRegistry('https://registry-1.docker.io/v2/', 'Dockerhub') {
                    dockerImage = docker.build registry
                    dockerImage.push()
                }
            }    

         }
        }

    }
}