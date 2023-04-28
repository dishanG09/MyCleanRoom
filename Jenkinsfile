pipeline {
    
    environment{
        DOCKERHUB = credentials('hub_credentials')
        MYSQL = credentials('MCR_DB_CRED')
        MYSQL_ROOT_PASSWORD = credentials('MYSQL_ROOT_PASSWORD')
        APP_DB = credentials('MYSQL_DB')
        PORT = credentials('SERVER_PORT')
        MCR_DB_URI = credentials('MCR_DB_URI')
        MCR_VAULT_PASSWORD = credentials('MCR_VAULT_PASSWORD')
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
                sh 'docker build -t dishang09/mcr_backend ./backend'
            }
        }  

        stage('Running Test'){
            steps{
                sh '''
                    export DB_URI=$MCR_DB_URI
                    cd ./backend
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
                sh 'docker image prune --force --all'
            }
        }

        stage('deploy application'){
            steps{
                
                ansiblePlaybook
                colorized: true,
                installation: 'Ansible',
                inventory: 'inventory',
                playbook: 'deployment_playbook.yaml',
                vaultCredentialsId: 'MCR_VAULT_PASSWORD'

                // sh '''
                //     ansible-playbook -i inventory deployment_playbook.yaml
                // '''

            }
        }
    }
}
