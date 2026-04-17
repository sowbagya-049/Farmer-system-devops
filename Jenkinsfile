pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root:root'
        }
    }

    environment {
        SONAR_HOST_URL = 'http://host.docker.internal:9000'
        SONAR_TOKEN = 'sqa_ece832660528dce776c0044005176210d58ab2f6'
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
                dir('backend') {
                    sh '''
                    npm install sonar-scanner --save-dev
                    npx sonar-scanner \
                    -Dsonar.projectKey=smart-farmer-devops \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=$SONAR_HOST_URL \
                    -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

    }
}
