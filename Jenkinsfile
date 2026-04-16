pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    stages {

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    cd backend
                    npm install -g sonar-scanner
                    sonar-scanner
                    '''
                }
            }
        }
    }
}
