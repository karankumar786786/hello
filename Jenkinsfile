pipeline {
    agent any
    environment {
        IMAGE_NAME = 'karankumar9955/hello'
        IMAGE_TAG = 'latest'
    }
    stages {
        stage('clone') {
            steps {
                git branch: 'main', url: 'https://github.com/karankumar786786/hello.git'
            }
        }
        stage('build') {
            steps {
                sh """
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                """
            }
        }
        stage('docker login') {
            steps {
                withCredentials([usernamePassword(credentialId: 'dockerHubCredential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USER -p $DOCKER_PASSWORD"
                }
            }
        }
        stage('push image') {
            steps {
                sh "docker push $IMAGE_NAME:$IMAGE_TAG"
            }
        }
        stage('deploy') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d
                '''
            }
        }
    }
}
