pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/projectname.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Start Server') {
            steps {
                sh 'echo Build Successful'
            }
        }
    }
}
