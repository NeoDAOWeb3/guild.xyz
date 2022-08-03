import { PlatformName } from "types"
import BaseOAuthSelectButton from "./BaseOAuthSelectButton"

type Props = {
  onSelection: (platform: PlatformName) => void
}

const GitHubSelectButton = ({ onSelection }: Props) => (
  <BaseOAuthSelectButton
    buttonText="Select repo"
    onSelection={onSelection}
    platform="GITHUB"
  />
)

export default GitHubSelectButton
