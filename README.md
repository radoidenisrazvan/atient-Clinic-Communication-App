# Patient-Clinic-Communication-App: Setup Guide

Acest document oferă pașii detaliați pentru configurarea și rularea proiectului `Patient-Clinic-Communication-App`.

---

## Tehnologii Utilizate

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React Native (Expo)
- **Tool-uri**: Postman/Insomnia pentru testarea API-ului

---

## Setup General al Sistemului

1. **Instalare Node.js**
   - Descarcă și instalează Node.js de pe [nodejs.org](https://nodejs.org).
   - Verifică instalarea:
     ```bash
     node --version
     npm --version
     ```

2. **Instalare MongoDB**
   - Descarcă și instalează MongoDB de pe [mongodb.com](https://www.mongodb.com/try/download/community).
   - După instalare, pornește MongoDB Compass si conecteaza-te la baza de date: localhost:27017
   


3. **Instalare Git**
   - Descarcă și instalează Git de pe [git-scm.com](https://git-scm.com/).
   - Verifică instalarea:
     ```bash
     git --version
     ```

4. **Instalare Expo CLI**
   - Instalează Expo CLI global:
     ```bash
     npm install -g expo-cli
     ```
   - Verifică instalarea:
     ```bash
     expo --version
     ```

5. **Instalare Postman (sau Insomnia)**
   - Descarcă și instalează [Postman](https://www.postman.com/) pentru testarea API-ului.

### 6. **Instalare Android Studio și Java**
   #### Pasul 1: Descarcă și instalează Android Studio
   - Descarcă de pe [developer.android.com](https://developer.android.com/studio) și instalează Android Studio.
   - Asigură-te că bifezi opțiunea de instalare a `Android SDK`, `Android SDK Platform`, `Android Virtual Device` în timpul instalării.
   - Descarcă de pe [oracle.com](https://www.oracle.com/java/technologies/downloads/?er=221886#jdk23-windows) și instalează ultima versiune de JAVA (JDK 23)

   #### Pasul 2: Configurează Android SDK
   - Verifică locația SDK în Android Studio:
     - Deschide **Android Studio**.
     - Navighează la **File > Settings > Appearance & Behavior > System Settings > Android SDK**.
     - Notează locația SDK-ului (ex: `C:\Users\<username>\AppData\Local\Android\Sdk`).

   #### Pasul 3: Setează variabilele de mediu
   1. Adaugă următoarele variabile în sistem:
      - **ANDROID_HOME**: Calea către SDK-ul Android (ex: `C:\Users\<username>\AppData\Local\Android\Sdk`).
      - **JAVA_HOME**: Calea către JDK instalat (ex: `C:\Program Files\Java\jdk-<version>`).

   2. Adaugă în variabila de mediu `Path` următoarele:
      - `%ANDROID_HOME%\platform-tools`
      - `%ANDROID_HOME%\tools`
      - `%JAVA_HOME%\bin`

   #### Pasul 4: Verifică instalarea
   - Deschide un terminal și rulează:
     ```bash
     adb --version
     java -version
     ```

---

## Clonarea Proiectului

1. Cloneaza repository-ul GitHub:
   ```bash
   git clone https://github.com/radoidenisrazvan/Patient-Clinic-Communication-App.git
   cd Patient-Clinic-Communication-App
   ```

## Configurare Backend

1. navigheaza catre backend:
    ```bash
    cd backend
    ```
2. instaleaza dependentele backend-ului:
    ```bash
    npm install
    ```
3. creeaza un fisier .env cu urmatorul continut:
    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/patientclinicapp
    JWT_SECRET=your_jwt_secret
    ```
    
    JWT_SECRET= poti genera in terminal cu "node -e "console.log(require('crypto').randomBytes(64).toString('hex'))""
4. porneste server-ul backend:
    ```bash
    npm run dev
    ```

## Configurare Frontend

1. navigheaza catre frontend
    ```bash
    cd frontend
    ```
2. instaleaza dependentele frontend-ului:
    ```bash
    npm install
    ```
3. porneste server-ul expo:
    ```bash
    npm start
    ```

## Testare backend (postman):

1. Configurare Postman
    - Creează o cerere POST pentru ruta http://localhost:5000/api/auth/register.
    - În corpul cererii, trimite următorul JSON:
        ```{
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123"
        }```
    - verifica raspunsul primit si ca utilizatorul a fost salvat in baza de date.
2. Login user:
    - Creează o cerere POST pentru ruta http://localhost:5000/api/auth/login.
    - În corpul cererii, trimite următorul JSON:
        ```{
        "email": "johndoe@example.com",
        "password": "password123"
        }```
    - Verifică răspunsul primit și token-ul generat.




    

