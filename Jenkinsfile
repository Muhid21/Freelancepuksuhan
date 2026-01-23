pipeline {
    agent any

    environment {
        // Ajusta el nombre si tu carpeta en /var/www se llama diferente
        APP_NAME   = 'Freelancepuksuhan'
        DEPLOY_DIR = '/var/www/Freelancepuksuhan' 
    }

    stages {
        stage('Checkout') {
            steps {
                // Ahora esto SÍ funcionará porque configuraste el SCM en la UI de Jenkins
                checkout scm
            }
        }

        stage('Install Dev dependencies') {
            steps {
                // Instalamos todo aquí para poder correr los tests
                sh 'npm install'
            }
        }

        stage('Test') {
            when { expression { fileExists('package.json') } }
            steps {
                sh '''
                if npm run | grep -q "test"; then
                  npm test
                else
                  echo "No hay tests definidos, saltando etapa."
                fi
                '''
            }
        }

        stage('Build') {
            when { expression { fileExists('package.json') } }
            steps {
                sh '''
                if npm run | grep -q "build"; then
                  npm run build
                fi
                '''
            }
        }

        stage('Deploy Files') {
            steps {
                sh '''
                echo "Desplegando archivos a ${DEPLOY_DIR}..."
                
                # Crear directorio si no existe (asegúrate que el usuario jenkins tenga permisos aquí)
                mkdir -p ${DEPLOY_DIR}

                # Copiamos todo EXCEPTO node_modules y .git
                # Esto es vital para no arrastrar binarios incorrectos
                rsync -av --delete --exclude=".git" --exclude="node_modules" ./ ${DEPLOY_DIR}/
                '''
            }
        }

        stage('Install Prod Dependencies') {
            steps {
                sh '''
                echo "Instalando dependencias de producción en destino..."
                cd ${DEPLOY_DIR}
                
                # Instalamos SOLO lo necesario para que la app corra (más rápido y seguro)
                npm install --production
                '''
            }
        }

        stage('Restart service') {
            steps {
                sh '''
                cd ${DEPLOY_DIR}
                
                # Verificamos si el proceso ya existe en PM2
                if pm2 list | grep -q "${APP_NAME}"; then
                    echo "Recargando aplicación existente..."
                    pm2 reload ${APP_NAME}
                else
                    echo "Iniciando aplicación por primera vez..."
                    # Asegúrate de que 'index.js' es tu archivo de arranque
                    pm2 start index.js --name ${APP_NAME}
                fi
                
                # Guardamos la lista de procesos para que revivan si el servidor se reinicia
                pm2 save
                '''
            }
        }
    }
}
