# Backend-Datenanforderungen für das LMS-Frontend

Diese Übersicht beschreibt, welche Datenmodelle und Felder das Frontend benötigt, wie sie strukturiert sein sollten und welche Daten aus Workday kommen müssen bzw. in der eigenen Datenbank gepflegt werden sollten.

---

## 1. Nutzer (User)
**Quelle:** Eigene DB (Stammdaten ggf. aus Workday synchronisieren)

| Feld         | Typ     | Beschreibung                        | Workday? |
|--------------|---------|--------------------------------------|----------|
| id           | string  | Eindeutige User-ID                   | Ja       |
| name         | string  | Name                                 | Ja       |
| email        | string  | E-Mail-Adresse                       | Ja       |
| department   | string  | Abteilung                            | Ja       |
| role         | enum    | 'employee'/'manager'/'lms_manager'/'admin' | Ja   |
| managerId    | string  | ID des Vorgesetzten                  | Ja       |
| position     | string  | Position/Funktion                    | Ja       |
| avatar       | string  | Profilbild-URL                       | Nein     |
| joinDate     | string  | Eintrittsdatum                       | Ja       |
| country      | string  | Land                                 | Ja       |

---

## 2. Schulungen (Training)
**Quelle:** Eigene DB

| Feld                | Typ      | Beschreibung                       | Workday? |
|---------------------|----------|-------------------------------------|----------|
| id                  | string   | Eindeutige Schulungs-ID             | Nein     |
| title               | string   | Titel                               | Nein     |
| description         | string   | Beschreibung                        | Nein     |
| category            | enum     | Kategorie                           | Nein     |
| date                | string   | Startdatum                          | Nein     |
| duration            | string   | Dauer (z.B. '2 Tage')               | Nein     |
| location            | string   | Ort                                 | Nein     |
| maxParticipants     | number   | Maximale Teilnehmer                 | Nein     |
| currentParticipants | number   | Aktuelle Teilnehmer                 | Nein     |
| price               | number   | Preis                               | Nein     |
| provider            | string   | Anbieter                            | Nein     |
| status              | enum     | 'available'/'full'/'registered'/'completed'/'cancelled' | Nein |
| tags                | string[] | Tags/Schlagworte                    | Nein     |
| requirements        | string[] | Voraussetzungen                     | Nein     |
| learningObjectives  | string[] | Lernziele                           | Nein     |
| createdBy           | string   | LMS-Manager-ID                      | Nein     |

---

## 3. Anmeldungen (TrainingRegistration)
**Quelle:** Eigene DB, Status ggf. mit Workday synchronisieren

| Feld           | Typ     | Beschreibung                        | Workday? |
|----------------|---------|--------------------------------------|----------|
| id             | string  | Eindeutige Anmelde-ID                | Nein     |
| trainingId     | string  | Schulungs-ID                         | Nein     |
| userId         | string  | User-ID                              | Nein     |
| registrationDate| string | Anmeldedatum                         | Nein     |
| status         | enum    | 'pending_manager'/'pending_lms'/'approved'/'rejected'/'cancelled' | Ja (Status muss synchronisiert werden) |
| managerId      | string  | ID des genehmigenden Managers        | Ja       |
| lmsManagerId   | string  | ID des genehmigenden LMS-Managers    | Ja       |
| rejectionReason| string  | Ablehnungsgrund                      | Ja       |
| comments       | string  | Kommentar des Nutzers                | Nein     |

---

## 4. Zertifikate (Certificate)
**Quelle:** Eigene DB, Status/Verknüpfung mit Workday

| Feld             | Typ     | Beschreibung                        | Workday? |
|------------------|---------|--------------------------------------|----------|
| id               | string  | Eindeutige Zertifikats-ID            | Nein     |
| userId           | string  | User-ID                              | Nein     |
| trainingId       | string  | Schulungs-ID                         | Nein     |
| title            | string  | Titel                                | Nein     |
| issueDate        | string  | Ausstellungsdatum                    | Nein     |
| expiryDate       | string  | Ablaufdatum                          | Ja (Ablaufdatum kann aus Workday kommen) |
| fileUrl          | string  | Download-Link                        | Nein     |
| workdayStatus    | enum    | 'pending'/'uploaded'/'verified'      | Ja       |
| certificateNumber| string  | Zertifikatsnummer                    | Nein     |
| issuer           | string  | Aussteller                           | Nein     |

---

## 5. Benachrichtigungen (Notification)
**Quelle:** Eigene DB, Reminder können automatisch generiert werden

| Feld      | Typ     | Beschreibung                        | Workday? |
|-----------|---------|--------------------------------------|----------|
| id        | string  | Eindeutige Notification-ID           | Nein     |
| userId    | string  | User-ID                              | Nein     |
| type      | enum    | 'registration'/'approval'/'rejection'/'reminder'/'certificate' | Ja (Status aus Workday kann Reminder triggern) |
| title     | string  | Titel                                | Nein     |
| message   | string  | Nachricht                            | Nein     |
| date      | string  | Datum                                | Nein     |
| read      | boolean | Gelesen-Status                       | Nein     |
| actionUrl | string  | Link zur Aktion                      | Nein     |

---

## 6. Feedback zu Schulungen (TrainingFeedback)
**Quelle:** Eigene DB

| Feld      | Typ     | Beschreibung                        | Workday? |
|-----------|---------|--------------------------------------|----------|
| id        | string  | Eindeutige Feedback-ID               | Nein     |
| trainingId| string  | Schulungs-ID                         | Nein     |
| userId    | string  | User-ID                              | Nein     |
| rating    | number  | 1-5 Sterne                           | Nein     |
| comment   | string  | Kommentar                            | Nein     |
| date      | string  | Datum                                | Nein     |

---

## Hinweise zur Synchronisation mit Workday
- **User-Stammdaten** (Name, E-Mail, Abteilung, Rolle, Manager, Eintritt, Land) sollten regelmäßig aus Workday synchronisiert werden.
- **Anmeldestatus** (z. B. ob ein Training genehmigt wurde) kann aus Workday übernommen werden, falls der Genehmigungsprozess dort läuft.
- **Zertifikatsstatus und Ablaufdaten** können aus Workday übernommen werden, falls dort gepflegt.
- **Reminder/Benachrichtigungen** können durch Statusänderungen in Workday getriggert werden, werden aber im LMS gespeichert und angezeigt.

---

## Zusammenfassung: Was muss in der eigenen DB gepflegt werden?
- Alle Trainings (Stammdaten, Termine, Anbieter, etc.)
- Alle Anmeldungen inkl. Status, Manager/LMS-Manager-IDs, Kommentare
- Alle Zertifikate inkl. Datei, Status, Ablaufdatum (ggf. aus Workday)
- Alle Benachrichtigungen (Reminder, Statusänderungen, etc.)
- Feedback zu Schulungen
- User-Stammdaten (regelmäßig mit Workday abgleichen)

## Was muss aus Workday kommen?
- User-Stammdaten (Name, E-Mail, Abteilung, Rolle, Manager, Eintritt, Land)
- Genehmigungsstatus für Anmeldungen (optional, falls Prozess in Workday)
- Zertifikatsstatus und Ablaufdaten (optional, falls in Workday gepflegt)

---

**Tipp:**
- Die IDs (userId, trainingId, etc.) sollten in beiden Systemen eindeutig und synchronisiert sein.
- Für eine saubere Integration empfiehlt sich ein regelmäßiger Import/Synchronisationsjob aus Workday ins LMS. 