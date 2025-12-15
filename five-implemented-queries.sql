--Query for creating a user
--Used by the sign-up form/page on our website

INSERT INTO users (userid, email, password, username)
VALUES (
           37,
           'demoUser2@gmail.com.com',
           crypt('password', gen_salt('bf')),
           'demoUser2'
       );

--Query for creating a recipe
--Used by the recipe creation form/page on our website

INSERT INTO recipes (
	recipeid,
    cook_time,
    description,
    difficulty,
    image_url,
    prep_time,
    servings,
    steps,
    title,
    upvotes,
    user_id
)
VALUES (
		   1,
           15,
           'Simple garlic butter pasta tossed with parmesan and fresh herbs.',
           '1',
           'https://www.tasteofhome.com/wp-content/uploads/2024/10/Garlic-Butter-Pasta_EXPS_TOHD24_19316_SoniaBozzo_social.jpg',
           10,
           2,
           E'Bring a large pot of salted water to a boil.\n
	Cook pasta according to package directions until al dente.\n
	While pasta cooks, melt butter in a pan over medium heat.\n
	Add minced garlic and sauté until fragrant.\n
	Drain pasta and toss with garlic butter.\n
	Top with parmesan cheese and fresh herbs.',
           'Garlic Butter Pasta',
           0,
           36 
       );

--Query for filtering by a tag (in this case, VEGETARIAN)
--Used by the recipe browser on our website

SELECT r.*
FROM public.recipes AS r
JOIN public.recipe_tags AS rt
    ON r.recipeid = rt.recipe_recipeid
WHERE rt.tags = 'VEGETARIAN';

--Query for creating a comment
--Used by the recipe detail page on our website

INSERT INTO comments (created_at, text, user_id, recipe_id)
VALUES (
           NOW(),
           'Spaghetti is really good!',
           22,
           19
       );

--Query for displaying profile information for a user
--Used by the "profile" page on our website

SELECT
    u.username,
    COUNT(r.recipeid) OVER (PARTITION BY u.userid) AS total_recipes,
    r.recipeid,
    r.title,
    r.description,
    r.cook_time,
    r.prep_time,
    r.servings,
    r.difficulty
FROM users AS u
JOIN recipes AS r
    ON r.user_id = u.userid
WHERE u.username = 'demoUser1';
