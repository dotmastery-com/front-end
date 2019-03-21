pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {

        stage('Initialize'){
            def dockerHome = tool 'myDocker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }

        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }

        stage('Build and Push Docker Image') {

          steps {
            sh 'docker build -t dotmastery/frontend .'
            sh 'docker push dotmastery/frontend'
         }
        }

    }
}