# Test requirements

For starters, I'd like to mention that I've never worked before with nodejs and this last year although I've programming it has been a very different style from what I used to do and only for academic purposes.

The test clearly follows an Hexagonal Architecture approach with DDD so I followed those principles as much as I could considering this is just a test to open a conversation and of course there is room for improvement.
In order to go faster I've found a project from Codely made with Typescript that helped a little with some stuff.

## Stage 1: Basic features

I've implemented the API tests following TDD principles as much as possible considering Im pretty newbie to this tech stack.
I've done the tests with Vitest, I know there are thousand of examples with Jest but I'd like to give it a try (not sure yet if it was a good idea...)

## Stage 2: Persistence

In this stage I've implemented an integration test for MongoDB and its repository, I've encountered some issues connecting to the database I didn't manage to fix so when I started to get stuck and felt like time was running nowhere I left this feature with a skipped test and started with next stage

## Stage 3: Advanced features

Although I've worked with Kafka in the past and event oriented developments and features I've no idea how RabbitMQ works, so I started to create much of the code needed for the purpouse and update the creation service to consider events


## Final thoughts

I would like to have had more time to invest but it's been two weeks since we spoke for the first time (very busy weeks for me, couldn't find the time and the peace to work on this) and I'm very excited to continue with the process so I decided to deliver already despite I know there's room for improvement in what I have done (for example have worked with mother objects) and of course complete the functionality end to end.