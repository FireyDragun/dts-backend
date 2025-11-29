This is my NestJS application for the back-end for the assignment by the Ministry of Justice.

- Ensure this is running before the front-end
- npm i to download the necessary documentation
- The application requires the command npm run start to start


# API Documentation #

**POST** `/v1/create`

Creates a new **Task** resource.

---

## Request Body Parameters

| Parameter       | Type   | Required | Description |
|-----------------|--------|----------|-------------|
| **taskName**    | string | Yes      | The name/title of the task. |
| **description** | string | No       | Extra details or notes about the task. |
| **status**      | string | Yes      | Must be one of: `not started yet`, `in-progress`, `complete`. |
| **dueDate**     | string | Yes      | Date in **DD/MM/YYYY** format. |

---

## Example Request

**POST** `/v1/create`
```json
{
  "taskName": "Finish project documentation",
  "description": "Write API docs and architecture overview",
  "status": "in-progress",
  "dueDate": "30/11/2025"
}

