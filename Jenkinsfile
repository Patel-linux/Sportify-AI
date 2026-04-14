pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {
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
}pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {
<<<<<<< HEAD
=======

>>>>>>> bd6e7ac061165fc8c39ad5df2b5492b0befc4018
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
<<<<<<< HEAD
    }
}
=======

    }
}
>>>>>>> bd6e7ac061165fc8c39ad5df2b5492b0befc4018
