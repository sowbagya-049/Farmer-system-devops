pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root:root'
        }
    }

    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000'
        SONAR_TOKEN = 'sqa_72d6704d9a9e761b2749f3fb9f3d6813964af4bb'
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

                    unzip -oq sonar-scanner-cli-*.zip

                    cd sonar-scanner-*/bin

                    chmod +x sonar-scanner

                    ./sonar-scanner \
                    -Dsonar.projectKey=smart-farmer-devops \
                    -Dsonar.sources=../../ \
                    -Dsonar.host.url=http://sonarqube:9000
                    -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }
    }
}
	
