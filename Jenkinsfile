pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Success') {
            steps {
                sh 'echo Build Successful'
            }
        }
    }
}
