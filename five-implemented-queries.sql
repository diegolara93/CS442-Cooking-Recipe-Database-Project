--Query for creating a user
--Used by the sign-up form/page on our website

INSERT INTO users (userid, email, password, username)
VALUES (
           37,
           'demoUser2@gmail.com',
           crypt('password', gen_salt('bf')),
           'demoUser2'
       );

--Query for creating a recipe
--Used by the recipe creation form/page on our website

INSERT INTO public.recipes (
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
           20,
           15,
           'Crispy taco shells filled with seasoned beef, lettuce, cheese, and salsa.',
           '1',
           'https://i.imgur.com/Hp9Ira1.jpeg',
           10,
           4,
           E'Heat oil in a pan and cook ground beef until browned.\n'
           E'Add taco seasoning and a splash of water and simmer for 5 minutes.\n'
           E'Warm taco shells in the oven or on a pan.\n'
           E'Fill shells with beef, lettuce, cheese, and salsa.\n'
           E'Top with sour cream or avocado if desired.',
           'Beef Tacos',
           0,
           24
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

INSERT INTO public.comments (created_at, text, user_id, recipe_id)
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
FROM public.users   AS u
         JOIN public.recipes AS r
              ON r.user_id = u.userid
WHERE u.username = 'diegoL';
