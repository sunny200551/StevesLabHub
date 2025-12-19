# How to Manually Add New Materials

This guide explains how to add new materials (like PDFs, documents, images, or external links) to your website directly through the GitHub repository.

The process involves two main steps:
1.  **Uploading the File** to the correct folder.
2.  **Updating the Data File** (`src/lib/data.ts`) to make the app aware of the new material.

---

### Step 1: Upload Your File

First, you need to add your file (e.g., a `.pdf`, `.jpg`, `.png`) to your project's `public` directory. This makes it accessible to the website.

1.  **Navigate to the `public` folder** in your GitHub repository.
2.  For better organization, place your file inside an appropriate subfolder. We recommend:
    *   `public/materials/` for general documents, notes, and question papers.
    *   `public/syllabi/` for syllabus documents.
    *   `public/images/` for any image files.
3.  **Use the "Add file" > "Upload files" button** in GitHub to upload your file to the chosen directory.

**Example:**
If you have a PDF for Machine Learning notes named `ml-notes.pdf`, you would upload it to `public/materials/`. The final path would be `public/materials/ml-notes.pdf`.

---

### Step 2: Update the `data.ts` Data File

Next, you need to tell the application about the new material by adding an entry to the `materialsData` constant inside the `src/lib/data.ts` file.

1.  **Navigate to and edit the `src/lib/data.ts` file.**
2.  Find the `materialsData` constant. Inside its `materials` array, add a new JSON object for your item. Each object must have the following fields:

    *   `id`: A unique identifier for this material. Use a short, descriptive name (e.g., `"mat-ml-unit1-notes"`).
    *   `subjectId`: The official ID of the subject this material belongs to (e.g., `"23CS32T1"` for Machine Learning). You can find the subject IDs in the `src/lib/data/` directory, inside the respective `subject.json` files.
    *   `type`: The category of the material. This determines its icon and filter group. Use one of the following values:
        *   `"Notes"`
        *   `"Assignment"`
        *   `"Question Paper"`
        *   `"Syllabus"`
        *   `"Link"` (for external URLs)
        *   `"Image"`
        *   `"Document"`
    *   `title`: The full title that will be displayed on the material card (e.g., `"Machine Learning Unit 1 Complete Notes"`).
    *   `url`: The path to the file you uploaded in Step 1, or the full external URL for a link.
        *   **For local files:** The path must start with a `/`. For our example, this would be `"/materials/ml-notes.pdf"`.
        *   **For external links:** Use the full URL, like `"https://www.example.com/some-article"`.
    *   `fileType`: Specifies how the file should be handled.
        *   `"PDF"` or `"Image"`: The file will open in a viewer dialog on the site.
        *   `"Link"`: The URL will open in a new browser tab.
        *   `"Document"`: The file will be triggered as a download.

### Example Entry

Here is an example of what to add to the `materials` array in `src/lib/data.ts` for our `ml-notes.pdf` example:

```javascript
const materialsData = {
  "materials": [
    // ... other existing materials
    {
      "id": "mat-ml-unit1-notes",
      "subjectId": "23CS32T1",
      "type": "Notes",
      "title": "Machine Learning Unit 1 Complete Notes",
      "url": "/materials/ml-notes.pdf",
      "fileType": "PDF"
    },
    // ... other existing materials
  ]
};
```

After committing these changes to your `main` branch, the website's deployment action will automatically run and your new material will appear on the site.
