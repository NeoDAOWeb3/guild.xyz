import {
  Divider,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import StyledSelect from "components/common/StyledSelect"
import OptionImage from "components/common/StyledSelect/components/CustomSelectOption/components/OptionImage"
import {
  Chain,
  Chains,
  RPC,
  supportedChains as defaultSupportedChains,
} from "connectors"
import { useEffect, useMemo } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { SelectOption } from "types"

type Props = {
  controlName: string
  defaultChain: Chain
  supportedChains?: Array<Chain>
  onChange?: () => void
  isDisabled?: boolean
}

const mappedChains: Array<{ img: string; label: string; value: Chain }> =
  defaultSupportedChains.map((chainName: Chain) => ({
    img: RPC[chainName]?.iconUrls?.[0] || "",
    label: chainName,
    value: chainName,
  }))

const ChainPicker = ({
  controlName,
  defaultChain,
  supportedChains = defaultSupportedChains,
  onChange: onChangeHandler,
  isDisabled,
}: Props): JSX.Element => {
  const { setValue } = useFormContext()

  const { chainId } = useWeb3React()
  const chain = useWatch({ name: controlName })

  const mappedSupportedChains = useMemo(
    () =>
      supportedChains
        ? mappedChains?.filter((_chain) => supportedChains.includes(_chain.value))
        : mappedChains,
    [supportedChains]
  )

  // If default chain is null (create page), the ChainPicker component will use the user's current chain (if it's supported in the requirement) or ETHEREUM. Otherwise (edit page), it'll use the provided default chain
  useEffect(() => {
    if (chain) return
    setValue(
      controlName,
      supportedChains.includes(Chains[chainId] as Chain)
        ? Chains[chainId]
        : "ETHEREUM"
    )
  }, [chainId])

  return (
    <>
      <FormControl isRequired isDisabled={isDisabled}>
        <FormLabel>Chain</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <OptionImage img={RPC[chain]?.iconUrls?.[0]} alt={chain} />
          </InputLeftElement>
          <Controller
            name={controlName}
            defaultValue={defaultChain}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <StyledSelect
                ref={ref}
                options={mappedSupportedChains}
                value={mappedSupportedChains?.find(
                  (_chain) => _chain.value === value
                )}
                onChange={(selectedOption: SelectOption) => {
                  onChange(selectedOption?.value)
                  onChangeHandler?.()
                }}
                onBlur={onBlur}
              />
            )}
          />
        </InputGroup>
      </FormControl>
      <Divider />
    </>
  )
}

export default ChainPicker
