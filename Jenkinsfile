pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
       
