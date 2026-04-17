pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root:root'
        }
    }

    environment {
        SONAR_HOST_URL = 'http://172.17.0.1:9000'
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
                    apt update && apt install -y unzip wget

                    wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip

                    unzip -q sonar-scanner-cli-*.zip

                    cd sonar-scanner-*/bin

                    chmod +x sonar-scanner

                    ./sonar-scanner \
                    -Dsonar.projectKey=smart-farmer-devops \
                    -Dsonar.sources=../../ \
                    -Dsonar.host.url=$SONAR_HOST_URL \
                    -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }
    }
}
