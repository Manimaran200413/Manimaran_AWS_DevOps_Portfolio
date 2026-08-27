pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Manimaran200413/Manimaran_AWS_DevOps_Portfolio.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "Running basic HTML validation..."
                    test -f index.html && echo "index.html found" || (echo "index.html missing" && exit 1)
                '''
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['target-ec2-deploy-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@172.31.46.230 "mkdir -p /tmp/website"
                        scp -o StrictHostKeyChecking=no -r ./* ec2-user@172.31.46.230:/tmp/website/
                        ssh -o StrictHostKeyChecking=no ec2-user@172.31.46.230 "sudo rm -rf /usr/share/nginx/html/* && sudo cp -r /tmp/website/* /usr/share/nginx/html/"
                    '''
                }
            }
        }
    }

    post {
        success { echo 'Deployment successful!' }
        failure { echo 'Build or deployment failed.' }
    }
}
