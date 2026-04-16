pipeline {
    agent any

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
                    npx sonar-scanner
                    '''
                }
            }
        }
    }
}

