# How to Add New Materials

This guide explains how to add new materials (like PDFs, documents, images, or external links) to your website directly through the GitHub repository.

The process involves two main steps:
1.  **Uploading the File** to the correct folder.
2.  **Updating the Data File** (`src/lib/data.ts`) to make the app aware of the new material.

---

### Step 1: Upload Your File to the `public` Folder

First, you need to add your file (e.g., a `.pdf`, `.jpg`) to the project's `public` directory. This makes it accessible to the website.

1.  In your GitHub repository, navigate to the `public` folder.
2.  For better organization, place your file inside an appropriate subfolder. We recommend:
    *   `public/materials/` for general documents, notes, and question papers.
    *   `public/syllabi/` for syllabus documents.
    *   `public/images/` for any image files.
3.  Use the **"Add file" > "Upload files"** button in GitHub to upload your file to the chosen directory.

**Example:**
If you have a PDF for a syllabus named `ai-lab-syllabus.pdf`, you would upload it to the `public/syllabi/` folder.

---

### Step 2: Update the `data.ts` File

Next, you must tell the application about the new material by adding a new object to the `materials` array inside the `src/lib/data.ts` file.

1.  In your repository, navigate to and edit the `src/lib/data.ts` file.
2.  Find the `materialsData` constant. Inside its `materials` array, add a new object for your item.

#### Each material object needs these properties:

*   `id`: A unique name for the material (e.g., `"syl-ai-lab"`).
*   `subjectId`: The official ID of the subject this material belongs to. You can find all subject IDs in the `subject.json` files located in the `src/lib/data/` subdirectories. (e.g., `"23CS31P1"` for AI Lab).
*   `type`: The category of the material. This determines its icon and filter group. Use one of these exact values:
    *   `"Syllabus"`
    *   `"Notes"`
    *   `"Assignment"`
    *   `"Question Paper"`
    *   `"Link"` (for external URLs)
    *   `"Image"`
    *   `"Document"`
*   `title`: The full title that will be displayed on the card (e.g., `"AI Lab Syllabus"`).
*   `url`: The path to the file you uploaded in Step 1.
    *   **This path MUST start with a forward slash `/`** and match the location inside the `public` folder.
    *   For our example: `"/syllabi/ai-lab-syllabus.pdf"`.
*   `fileType`: Specifies how the file should be handled.
    *   `"PDF"` or `"Image"`: The file will open in a viewer dialog on the site.
    *   `"Link"`: The URL will open in a new browser tab.
    *   `"Document"`: The file will be triggered as a download.

---

### Example Entry

Here is an example of what to add to the `materials` array in `src/lib/data.ts` for our `ai-lab-syllabus.pdf` file:

```javascript
const materialsData = {
  "materials": [
    // ... other existing materials
    {
      "id": "syl-ai-lab",
      "subjectId": "23CS31P1",
      "type": "Syllabus",
      "title": "AI Lab Syllabus",
      "url": "/syllabi/ai-lab-syllabus.pdf",
      "fileType": "PDF"
    },
    // ... add other materials here
  ]
};
```

After you commit these changes to your `main` branch, the website's deployment action will automatically run, and your new material will appear on the site.
