import {
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import useGuild from "components/[guild]/hooks/useGuild"
import useUniqueMembers from "hooks/useUniqueMembers"
import { WarningCircle } from "phosphor-react"
import { memo } from "react"
import { GuildPlatform } from "types"

type Props = {
  guildPlatform: GuildPlatform
  size?: "sm" | "md"
}

const GoogleCardWarning = memo(
  ({ guildPlatform, size = "md" }: Props): JSX.Element => {
    const { roles } = useGuild()
    const rolesWithPlatform = roles.filter((role) =>
      role.rolePlatforms?.some(
        (rolePlatform) => rolePlatform.guildPlatformId === guildPlatform?.id
      )
    )
    const eligibleMembers = useUniqueMembers(rolesWithPlatform)

    if (eligibleMembers.length < 600) return null

    return (
      <Popover trigger="hover" openDelay={0}>
        <PopoverTrigger>
          <Icon
            as={WarningCircle}
            color="orange.300"
            weight="fill"
            // boxSize={size === "sm" ? 5 : 6}
            boxSize={6}
            p={size === "sm" ? "2px" : 0}
            tabIndex={0}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            {`Google limits documentum sharing to 600 users, and there're already ${eligibleMembers.length}
          eligible members, so you might not get access to this reward.`}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }
)

export default GoogleCardWarning
