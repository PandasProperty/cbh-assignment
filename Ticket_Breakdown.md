# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

The first thing I've done, was to look into the companies tech stack and to see if we are talking about a relational or non-relational database to know what solution would be better. The database is relational.

1. create the table relationship betweeen Facilities and Agents and Shifts 
- a Facility has more agents
- I will ask the product here, but I suppose for now that that an agent can work at more facilities
- so the table need to be many-to-many between facility ids and agent ids and shift ids

2. modify getShiftsByFacility to return the results grouped also by Agent
- modify the name to serve the new purpose getShiftsByFacilityGroupedByAgent
    - asseme that the previous return was [shift1, shift2, ...] now the result would be [{
      agent1: [shift1_1, shift1_2, ...],
      agent2: [shift2_1, shift2_2, ...],
      ...
    }] where agentX represents the agent with their shift at the given facility
    - if this informattion is not custom per every shift - "including some metadata about the Agent assigned to each" - but it is the same per agent then we have duplicated data and we should move it per agent, so the return of the function would change and it would be:
    [{
      agent1: {
        ...metadata_about_the_agent1
        shifts: [shift1_1, shift1_2, ...],
      },
      agent2: {
        ...metadata_about_the_agent2
        shifts: [shift2_1, shift2_2, ...],
      }
      ...
    }] 

3. modify generateReport to parse the new output of the function returning the facilities shifts grouped by agents, to use the new information and to generate the report based of it