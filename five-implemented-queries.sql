--Query for creating a user
--Used by the sign-up form/page on our website

INSERT INTO users (userid, email, password, username)
VALUES (
           1,
           'demoUser2@gmail.com.com',
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
           101,
           25,
           'A quick and delicious pasta recipe perfect for busy weeknights.',
           'Easy',
           'https://example.com/images/pasta.jpg',
           10,
           2,
           '1. Boil pasta until al dente.
       2. In a pan, sauté garlic in olive oil.
       3. Add cherry tomatoes and cook until soft.
       4. Toss cooked pasta with sauce.
       5. Garnish with basil and parmesan.',
           'Garlic Tomato Pasta',
           0,
           1
       );

--Query for filtering by a tag (in this case, VEGETARIAN)
--Used by the recipe browser on our website

SELECT r.*
FROM public.recipes AS r
         JOIN public.recipe_tags AS rt
              ON r.recipeid = rt.recipe_recipeid
WHERE rt.tags = 'VEGETARIAN';

--Query for creating a comment (from demoUser2 (user 37), on recipe 28)
--Used by the recipe detail page on our website

INSERT INTO public.comments (created_at, text, user_id, recipe_id)
VALUES (
           NOW(),
           'This recipe was fantastic! I loved the flavors.',
           17,
           5
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
WHERE u.username = 'markP';




