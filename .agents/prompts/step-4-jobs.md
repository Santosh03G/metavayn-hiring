STEP 4 - Jobs.
Create /data/jobs.ts with 10-12 mock jobs across all 5 disciplines, each: id, title, category, city, state, workMode (On-site/Hybrid/Remote), employmentType (Full-time/Contract/Contract-to-hire), compensationRange (USD, optional), responsibilities[], qualifications[], workAuthorization note, isIllustrative: true.

Jobs list page:
- Search by title/skill, filters: category, state, work mode, employment type (signals + computed filtering, instant results, filter chips with remove)
- Animated card grid; results animate (FLIP/stagger) when filters change
- Empty state, result count, URL query params sync (?category=)
- Banner: "Sample listings shown for illustration. Compensation and requirements are confirmed by the employer."

Job detail page (/jobs/:id): hero summary, About the role, Qualifications, Compensation (USD) if provided, work-authorisation note, sticky "Apply Now" panel that scrolls to / opens the application form, share button, related roles.

TEST: every filter combination works, deep link /jobs?category=hvac works, detail page loads by id, 404 for invalid id.
