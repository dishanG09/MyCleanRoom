pipeline {
    
    environment{
        DOCKERHUB = credentials('hub_credentials')
        MYSQL = credentials('MCR_DB_CRED')
        MYSQL_ROOT_PASSWORD = credentials('MYSQL_ROOT_PASSWORD')
        APP_DB = credentials('MYSQL_DB')
        PORT = credentials('SERVER_PORT')
    }

    agent any

    stages {

//         stage('cloning repo') {
//             steps {
//                 git 'git@github.com:dishanG09/MyCleanRoom.git'
//             }
//         }
        
        stage('building project images'){
            steps{
                //sh 'docker rmi $(docker images --format "{{.Repository}} {{.ID}}" | grep dishang* | awk -F\' \' \'{print $2}\')'
                sh 'docker build -t dishang09/mcr_backend ./server'
            }
        }  

        stage('Running Test'){
            steps{
                sh '''
                    $(cat configenv.txt)
                    cd ./server
                    npm ci
                    npm test
                    cd ..
                '''
            }
        }

        stage('uploading image to registry'){
            steps{
                sh '''
                        docker login -u $DOCKERHUB_USR -p $DOCKERHUB_PSW
                        docker push dishang09/mcr_backend
                    '''
            }
        }

        stage('cleaning local images'){
            steps{
                sh 'docker rmi dishang09/mcr_backend'
            }
        }

        stage('deploy application'){
            steps{
                
                sh '''
                    ansible-playbook -i inventory deployment_playbook.yaml
                '''

            }
        }
    }
}
