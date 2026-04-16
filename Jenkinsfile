pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/sowbagya-049/Farmer-system-devops.git'
            }
        }

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
                    npx sonar-scanner
                    '''
                }
            }
        }
    }
}

